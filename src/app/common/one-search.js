/**
 * oneSearch Provider:
 *  This is the core of the oneSearch application.
 *  Search engines (i.e., resources) use the oneSearch Provider to register as searchable.
 *  This allows resources/engines to be easily plug-able and templated independent of each other.
 *
 *  The oneSearch Provider expects engines to register in the config phase.
 *  Engines are registered using the Provider's engine(engine_name, params) function:
 *      engine_name: String - defines the identifier for the engine
 *      params: Object - defines details for querying the engine (see example below)
 *
 *  Example:
 *
 *  // Define the engine as an Angular module
 *  angular.module('engines.MY_ENGINES_NAME')
 *
 *  //Register the engine's configuration with the oneSearch Provider
 *  .config(['oneSearchProvider', function(oneSearchProvider){
 *      oneSearchProvider.engine('MY_ENGINE_NAME', {
 *          id: String|Integer, //The id given to the backend JSON response handler that identifies the engine
 *          resultsPath: String, // A string representing the Object path to the search results (e.g., "engine.path.to.results")
            totalsPath: String, // Optional - A string representing the Object path to the total number of results found
            mediaTypes: { // Optional - Requires mediaTypesProvider module - An Object that specify media type qualifiers within the engines results
                path: String // The base path in the results object for the media type qualifier
                types: {    // Object that specifies what media types there are and how to identify them
                    TYPE_LABEL: String|Array // TYPE_LABEL will be the type id and the String or Array of Strings will represent the value given from the 'path' specified above.
                }
            },
            templateUrl: String //a string representing that url path to the engine's template
            controller: Function|String //an injectable controller for the engine - can be a Function or String referring to an existing Controller
        });
    });
 *
 */
angular.module('common.oneSearch', [])

    .factory('Search', ['$http', '$q', function($http, $q){

        function search(params){

            var canceller = $q.defer();
            var url = '//wwwdev2.lib.ua.edu/oneSearch/api/search/' + params['s'] + '/engine/' + params['engine'] + '/limit/' + params['limit'];

            var request = $http({
                method: 'GET',
                url: url,
                timeout: canceller.promise
            });

            var promise = request.then(function(data){
                this.done = true;
                return data.data;
            }, function(data){
                return $q.reject('Error');
            });

            promise.done = false;

            promise.abort = function(){
                this.done = true;
                canceller.resolve();
            };

            promise.finally(
                function(){
                    promise.abort = angular.noop;
                    canceller = request = promise = null;
                    this.done = false;
                }
            );

            return promise;
        }

        return {
            request: search
        };
    }])

    .provider('oneSearch', ['mediaTypesProvider', function oneSearchProvider(mediaTypesProvider){
        //private object that holds registered engines
        var _engines = {};

        //function to allow engines to register as searchable
        this.engine = function(name, engine){
            if (angular.isString(name)){
                var defaults = {
                    id: null, priority: 10, resultsPath: null, totalsPath: null, mediaTypes: null, templateUrl: null, filterQuery: null, controller: null
                };

                var e = angular.extend(defaults, engine);
                if (e.id){
                    if (e.mediaTypes){
                        Object.keys(e.mediaTypes.types).map(function(type){
                            mediaTypesProvider.type(type, name);
                        })
                    }
                    else{ //if no mediaTypes are defined, the engine is considered it's own media type
                        mediaTypesProvider.type(name, name);
                        e.mediaTypes = name;
                    }

                    e.name = name;
                    _engines[name] = e;
                }
            }
            else{
                console.log({Error: "oneSearch engine must have STRING defined name", engineParams: engine});
            }
        };

        this.$get = ['$q', '$parse', '$filter', '$rootScope', 'enginesTemplateFactory', 'SearchParams', 'Search', function($q, $parse, $filter, $rootScope, enginesTemplateFactory, SearchParams, Search){

            return {
                engines: _engines, // Expose engines at Service level
                searchAll: function(params){

                    //extend give params with default SearchParams
                    angular.extend(params, SearchParams);

                    // Sort engines by 'priority'
                    var prioritized = $filter('orderObjectBy')( _engines, 'priority');

                    // Cycle through each registered engine, send the GET request, then return $http's promise by default.
                    // Returning the promise, instead of the JSON data, allows for async loading of results.
                    angular.forEach(prioritized, function(engine, name){
                        //Create a local parameters variable 'p' and specify the engine id.
                        var p = {engine: engine.id};

                        //Extend local parameters by global params.
                        angular.extend(p, params);

                        //if filterQuery present, add it to query
                        // TODO: add proper REST support by accepting filter queries as objects and not just strings
                        if (engine.filterQuery !== null){
                            p.s += ' ' + engine.filterQuery;
                        }

                        /*console.log({
                         engine: engine,
                         params: p
                         });*/

                        // Store the $http response promise in the engine's object with key 'response'
                        engine.response = Search.request(p);

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.resultsPath)){
                            engine.getResults = $parse(engine.resultsPath);
                        }

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.totalsPath)){
                            engine.getTotal = $parse(engine.totalsPath);
                        }

                        // Create resource link getter for "more" results link
                        engine.getResourceLink = $parse("resourceLinks");

                        // Put engine's object in private _engines object
                        _engines[name] = engine;
                    });

                    // Return all engines with response promises, and getter functions
                    return _engines;
                },
                getEngineTemplate: function(engine){
                    return enginesTemplateFactory.get(engine);
                },
                getEngineController: function(engine){
                    return angular.isDefined(engine.controller) ? engine.controller : null;
                }

            }
        }]
    }])

    .controller('OneSearchCtrl', ['$scope', '$location', '$rootScope', '$window', 'oneSearch', function($scope, $location, $rootScope, $window, oneSearch){
        $scope.searchText;

        function abortPendingSearches(){
            for (var e in oneSearch.engines){
                if (oneSearch.engines[e].response && !oneSearch.engines[e].response.done){
                    oneSearch.engines[e].response.abort();
                }
            }
        }

        $scope.search = function(){
            if ($scope.searchText){
                $scope.searchText = $scope.searchText.replace(/\//g, ' ').trim();
                var searchText = encodeURIComponent($scope.searchText);

                //Cancel any pending searches - prevents mixed results by canceling the ajax requests
                abortPendingSearches();

                // Compensate for when not on home page
                // Since WP pages aren't loaded as angular routes, we must detect if there is no '#/PATH' present
                // after the URI (or that it's not a 'bento' route), then send the browser to a pre-build URL.
                if (!$location.path() || $location.path().indexOf('/bento') < 0){
                    var url = '#/bento/' + searchText;
                    switch ($location.host()){
                        case 'wwwdev2.lib.ua.edu':
                        case 'www.lib.ua.edu':
                            url = '//' + $location.host() + url;
                            break;
                        case 'localhost':
                            url = $location.absUrl().replace(/(#.*)/, '') + url;
                            break;
                        default:
                            url = '//www.lib.ua.edu' + url;
                    }
                    $window.location = url; //Angular 1.2.8 $location is too limited...
                }
                else{
                    $location.path('/bento/'+$scope.searchText);
                }
            }
        };

        $scope.getRecommend = function(val){
            return $resource('//wwwdev2.lib.ua.edu/oneSearch/api/recommend/:search')
                .query({search: val})
                .$promise.then(function(rec) {
                    //console.log(rec);

                    return rec;
                });
        }


        $rootScope.$on('$routeChangeSuccess', function(event,currentRoute){
            if (currentRoute && $scope.searchText !== currentRoute.params.s){
                $scope.searchText = currentRoute.params.s;
            }
        });


    }])

    // Borrowed from https://github.com/fmquaglia/ngOrderObjectBy
    .filter('orderObjectBy', function() {
        return function (items, field, reverse) {
            var filtered = [];
            var newObj = {};
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            function index(obj, i) {
                return obj[i];
            }
            filtered.sort(function (a, b) {
                var comparator;
                var reducedA = field.split('.').reduce(index, a);
                var reducedB = field.split('.').reduce(index, b);
                if (reducedA === reducedB) {
                    comparator = 0;
                } else {
                    comparator = (reducedA > reducedB ? 1 : -1);
                }
                return comparator;
            });
            if (reverse) {
                filtered.reverse();
            }
            for (var i= 0, len = filtered.length; i < len; i++){
                var eng = filtered[i].name;
                newObj[eng] = filtered[i]
            }

            return newObj;
        };
    });