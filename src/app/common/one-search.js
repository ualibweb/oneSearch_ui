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
 *      oneSearchProvider.engine('MY_ENGIENS_NAME', {
 *          id: String|Integer, //The id given to the backend JSON response handler that identifies the engine
 *          resultsPath: String, // A string representing the Object path to the search results (e.g., "engine.path.to.results")
            totalsPath: String, // Optional - A string representing the Object path to the total number of results found
            mediaTypes: { // Optional - Requires mediaTypesProvider module - An Object that specify media type qualifiers within the engines results
                path: String // The base path in the results object for the media type qualifier
                types: {    // Object that specifies what media types there are and how to identify them
                    TYPE_LABEL: String // TYPE_LABEL will be the type id and the String will represent the value given from the 'path' specified above.
                }
            }
        });
    });
 *
 */
angular.module('common.oneSearch', [])

    .provider('oneSearch', ['mediaTypesProvider', function oneSearchProvider(mediaTypesProvider){
        var _engines = {};

        this.engine = function(name, engine){
            if (angular.isString(name) && angular.isDefined(engine.id)){

                if (angular.isDefined(engine.mediaTypes)){
                    Object.keys(engine.mediaTypes.types).map(function(type){
                        mediaTypesProvider.type(type, name);
                    })
                }
                else{
                    mediaTypesProvider.type(name, name);
                    engine.mediaTypes = name;
                }
                engine.name = name;
                _engines[name] = engine;
            }
        };

        this.$get = ['$http', '$parse', 'enginesTemplateFactory', 'SearchParams', 'JSON_URL', function($http, $parse, enginesTemplateFactory, SearchParams, url){

            return {
                engines: _engines, // Expose engines at Service level
                searchAll: function(params){
                    angular.extend(params, SearchParams);
                    angular.forEach(_engines, function(engine, name){
                        var p = {engine: engine.id};
                        angular.extend(p, params);
                        engine.response = $http({method: 'GET', url: url, params: p});

                        if (angular.isDefined(engine.resultsPath)){
                            engine.getResults = $parse(engine.resultsPath);
                        }
                        if (angular.isDefined(engine.totalsPath)){
                            engine.getTotal = $parse(engine.totalsPath);
                        }
                        _engines[name] = engine;
                    });
                    return _engines;
                },
                getEngineTemplate: function(engine){
                    return enginesTemplateFactory.get(engine);
                }

            }
        }]
    }])

    .controller('OneSearchCtrl', ['$scope', '$location', function($scope, $location){
        $scope.search = function(){
            if ($scope.searchText){
                $location.path('/bento/'+$scope.searchText);
            }
        }
    }])