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

    /**
     * @ngdoc service
     * @name oneSearch.Search
     *
     * @requires $http
     * @requires $q
     *
     * @description
     * Factory service use to make requests to the oneSearch API which will query and return an engine's results
     */

    .factory('Search', ['$http', '$q', function($http, $q){

        function search(params){

            var checkbox = document.querySelector('#scoutCheckbox input');
            var searchtext = document.querySelector('#osTextField').value;


/*
            console.log('SEARCHTEXT IS ');
            console.log(searchtext);
            if ((checkbox.checked) && (searchtext != null)) {
                window.location = 'http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&;scope=site&type=0&custid=s4594951&groupid=main&profid=eds&mode=and&authtype=ip,guest&bquery=' + params['s'];
            }
            else {
                break;
            }*/


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

        /**
         * @ngdoc method
         * @name oneSearch.Search#request
         * @methodOf oneSearch.Search
         *
         * @param {Object} params Object of search parameters (defaults can be set via the {@link oneSearch.SearchParams SearchParams service}).
         * @param {string} params.s Search string
         * @param {integer|string} params.engine The `id` of the engine to search
         * @param {integer=} [params.limit=100] - Maximum number of results to return
         *
         * @description
         *
         * @returns {Promise} Returns a custom `Promise` which allows the `$http` request to be aborted. Check the status of or abort a request using the `response` property.
         *
         * This custom promise contains all the standard {@link https://code.angularjs.org/1.2.29/docs/api/ng/service/$http#usage $http} return properties, but adds the `response` property:
         * - **response.done** - `{boolean}` - `true` when the $http request is finished
         * - **response.abort** - `{function}` - A function to abort a pending `$http` request
         *
         *
         * <pre>
         *     // Abort the request if it takes longer than 400ms
         *     var search = Search.request(params);
         *
         *     $timeout(function(){
         *          if (!search.request.done){
         *              search.request.abort();
         *          }
         *     }, 400);
         *
         * </pre>
         *
         */

        return {
            request: search
        };
    }])

    /**
     * @ngdoc service
     * @name oneSearch.oneSearchProvider
     *
     * @requires mediaTypes.mediaTypesProvider
     *
     * @description
     * This is the core of the oneSearch application.
     *  Search engines (i.e., resources) use the oneSearch Provider to register as searchable.
     *  This allows resources/engines to be easily plug-able and templated independent of each other.
     *
     *  The oneSearch Provider expects engines to register in the config phase.
     *  Engines are registered using the Provider's engine(engine_name, params) function:
     *      engine_name: String - defines the identifier for the engine
     *      params: Object - defines details for querying the engine (see example below)
     *
     * @example
     * <pre>
     * angular.module('engines.googleCS', [])
     *
     *    .config(['oneSearchProvider', function(oneSearchProvider){
     *       oneSearchProvider.engine('googleCS', {
     *           id: 16,
     *           title: 'Libraries\' Website',
     *           priority: 2,
     *           resultsPath: 'GoogleCS.items',
     *           totalsPath: 'GoogleCS.searchInformation.totalResults',
     *           filterQuery: '-site:guides.lib.ua.edu -site:ask.lib.ua.edu',
     *           templateUrl: 'common/engines/google-cs/google-cs.tpl.html',
     *           controller: 'GoogleCsCtrl'
     *       })
     *     }])
     *
     *     .controller(['$scope', function($scope){
     *       var items = $scope.items; // Grab the result items from controller $scope to manipulate
     *     })
     * </pre>
     * *__Note:__ For details on how new engines should be configured, see the {@link engines engines module} docs*
     */

    .provider('oneSearch', ['mediaTypesProvider', function oneSearchProvider(mediaTypesProvider){
        //private object that holds registered engines
        var _engines = {};

        /**
         * @ngdoc function
         * @name oneSearch.oneSearchProvider#engine
         * @methodOf oneSearch.oneSearchProvider
         *
         * @param {string} name Machine readable name of the engine being registered (e.g., no space or special characters)
         * @param {Object} engine Then `engine` object. This tells oneSearch how to search and process results from each engine
         *
         * @param {number|string} engine.id The id given to the backend JSON response handler that identifies the engine
         * @param {string=} engine.title Title to be displayed in the template
         * *(defaults to `string` value give by {@link oneSearch.oneSearchProvider#engine.name name parameter})*
         * @param {number} [engine.priority=10] Weight determining request order of engines. Smaller (lighter) number float to the top and are loaded first.
         * @param {string} engine.resultsPath String representing the JSON path to the search results from the API response (e.g., "engine.path.to.results")
         * @param {string=} engine.totalsPath String representing the JSON path to the `total results` object from API response
         * @param {Object=} engine.mediaTypes Configuration object to assign certain results to different `mediaTypes` (see @link oneSearch.mediaTypesProvider for details)
         * @param {string} engine.templateUrl File path to the engine's template. The template can either be a physical file or loaded into $templateCache *(template functions not yet supported)*
         * @param {string=} engine.filterQuery Filter query string that will be appended to search string.
         * @param {(string|function())=} engine.controller Custom controller to control $scope of each engine. Will accept a function or the name of a defined controller.
         *
         */

        //function to allow engines to register as searchable
        this.engine = function(name, engine){
            if (angular.isString(name)){
                var defaults = {
                    id: null, title: null, priority: 10, resultsPath: null, totalsPath: null, mediaTypes: null, templateUrl: null, filterQuery: null, controller: null
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

        /**
         * @ngdoc object
         * @name oneSearch.oneSearch
         *
         * @requires $q
         * @requires $parse
         * @requires $filter
         * @requires $rootScope
         * @requires $enginesTemplateFactory
         * @requires oneSearch.SearchParams
         * @requires oneSearch.Search
         *
         * @description
         * The `oneSearch` service acts as the access point to search engines during Angular's `run` phase (see Angular's {@link https://code.angularjs.org/1.2.29/docs/guide/module#module-loading-dependencies Module Loading & dependencies} documentation}.
         * Engines are configured and registered with `oneSearch` during the `configuration` phase. See {@link oneSearch.oneSearchProvider oneSearchProvider} docs for more details.
         *
         */

        this.$get = ['$q', '$parse', '$filter', '$rootScope', 'enginesTemplateFactory', 'SearchParams', 'Search', function($q, $parse, $filter, $rootScope, enginesTemplateFactory, SearchParams, Search){

            return {
                /**
                 * @ngdoc object
                 * @name oneSearch.oneSearch#engines
                 * @propertyOf oneSearch.oneSearch
                 *
                 * @description
                 * Object containing information about all engines registered through the {@link oneSearch.oneSearchProvider}. This `object` is extended upon
                 * search, adding the engine's results and status.
                 *
                 */
                engines: _engines, // Expose engines at Service level
                /**
                 * @ngdoc method
                 * @name oneSearch.oneSearch#searchAll
                 * @methodOf oneSearch.oneSearch
                 *
                 * @param {Object} params Params to send with REST API request
                 *
                 * @description
                 * Function to search all engines. The order requests are made is determined by the {@link oneSearch.oneSearchProvider#methods_engine priority} weight of each engine's configuration object
                 */
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
                /**
                 * @ngdoc method
                 * @name oneSearch.oneSearch#getEngineTemplate
                 * @methodOf oneSearch.oneSearch
                 *
                 * @param {Object} engine Config object for an engine
                 *
                 * @description
                 * Gets the template defined in an engine's config object
                 *
                 * @returns {string|Promise.<string>} The template html as a string, or a promise
                 * for that string.
                 */
                getEngineTemplate: function(engine){
                    return enginesTemplateFactory.get(engine);
                },
                /**
                 * @ngdoc method
                 * @name oneSearch.oneSearch#getEngineController
                 * @methodOf oneSearch.oneSearch
                 *
                 * @param {Object} engine Config object for an engine
                 *
                 * @description
                 * Gets the controller defined in an engine's config object
                 *
                 * @returns {string|function|null} Returns the name of a defined controller or the controller function defined with the given engine. If no
                 * controller was defined for the engine, then `null` is returned.
                 */
                getEngineController: function(engine){
                    return angular.isDefined(engine.controller) ? engine.controller : null;
                }

            }
        }]
    }])

    /**
     * @ngdoc controller
     * @name oneSearch.oneSearch:OneSearchCtrl
     *
     * @requires $scope
     * @requires $rootScope
     * @requires $location
     * @requires $window
     * @requires oneSearch.oneSearch
     *
     * @description
     * This controller should warp the search box form. It will provide search variables/methods relative to it's `$scope`. Be sure to compensate if any
     * directives under this controller define an isolated $scope.
     */

    .controller('OneSearchCtrl', ['$scope', '$location', '$rootScope', '$window', 'oneSearch', function($scope, $location, $rootScope, $window, oneSearch){
        $scope.searchText;

        function abortPendingSearches(){
            for (var e in oneSearch.engines){
                if (oneSearch.engines[e].response && !oneSearch.engines[e].response.done){
                    oneSearch.engines[e].response.abort();
                }
            }
        }

        /**
         * @ngdoc method
         * @name oneSearch.oneSearch:OneSearchCtrl#$scope.search
         * @methodOf oneSearch.oneSearch:OneSearchCtrl
         *
         * @description
         * This function will first check if the `$scope.searchText` model has value. If so, it will
         * 1. Trim any `/` characters from `$scope.searchText`
         * 2. Cancel any pending searches
         * 3. Route the browser to `#/bento/{$scope.searchText}`.
         *
         * Currently only the {@link bento} route is supported. Other views/routes may be supported in the future.
         *
         * **Note:** This function will route relative to UA Libraries' `live` and `dev` URLs. If this function is executed outside a UALib domain, `www.lib.ua.edu` will be used by default.
         */


        $scope.search = function(){
            /**
             * @ngdoc property
             * @name oneSearch.oneSearch:OneSearchCtrl:$scope.searchText
             * @propertyOf oneSearch.oneSearch:OneSearchCtrl
             *
             *  @description
             * The $scope model for the search string, bound to the input text box.
             */


            var checkbox = document.querySelector('#scoutCheckbox input');
            var searchtext = document.querySelector('#osTextField').value;


            if (checkbox && (checkbox.checked) && (searchtext !== '')) {
                window.location = 'http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&;scope=site&type=0&custid=s4594951&groupid=main&profid=eds&mode=and&authtype=ip,guest&bquery=' + searchtext;
            }
            else {
                if ($scope.searchText) {
                    $scope.searchText = $scope.searchText.replace(/[&\/\\#+()$~%':*?<>{}]/g, ' ').trim();
                    $scope.searchText = $scope.searchText.substring(0, 150);
                    var searchText = encodeURIComponent($scope.searchText);

                    //Cancel any pending searches - prevents mixed results by canceling the ajax requests
                    abortPendingSearches();

                    // Compensate for when not on home page
                    // Since WP pages aren't loaded as angular routes, we must detect if there is no '#/PATH' present
                    // after the URI (or that it's not a 'bento' route), then send the browser to a pre-build URL.
                    if (!$location.path() || $location.path().indexOf('/bento') < 0) {
                        var url = '#/bento/' + searchText;
                        switch ($location.host()) {
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
                    else {
                        $location.path('/bento/' + $scope.searchText);
                    }
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
        };


        $rootScope.$on('$routeChangeSuccess', function(event,currentRoute){
            if (currentRoute && $scope.searchText !== currentRoute.params.s){
                $scope.searchText = currentRoute.params.s;
            }
        });


    }])

    // Borrowed from https://github.com/fmquaglia/ngOrderObjectBy
    /**
     * @ngdoc filter
     * @name oneSearch.filter:orderObjectBy
     *
     * @param {Array.<Object>} items An `Array` or `Objects` to order
     * @param {string} field The field/property of the objects to order by
     * @param {boolean} [reverse=false] Order objects in reverse
     *
     * @description
     * Order's an array of objects by the value of a property in those objects.
     *
     * @example
     * <pre>
     *     var arrObj = [
     *          {n: 10},
     *          {n: 1},
     *          {n: -5}
     *      ];
     *
     *      var ordered = $filter('orderObjectBy')( _engines, 'n');
     *      &#47;*
     *        ordered is given an array of objects, ordered by `n`:
     *        [
     *          {n: -5},
     *          {n: 1},
     *          {n: 10}
     *        ];
     *      *&#47;
     * </pre>
     */
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