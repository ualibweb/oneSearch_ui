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