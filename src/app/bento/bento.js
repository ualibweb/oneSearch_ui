angular.module('oneSearch.bento', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/bento/:s', {
                templateUrl: 'bento/bento.tpl.html',
                controller: 'BentoCtrl'
            })
    }])

    .service('Bento', ['$routeParams', 'oneSearch', 'mediaTypes', function($routeParams, oneSearch, mediaTypes){
        var self = this;
        this.boxes = {};
        this.engines = {};

        angular.copy(mediaTypes.types, this.boxes);

        function loadProgress(type, engine){
            var i = self.boxes[type].engines.indexOf(engine);
            if(i != -1) {
                self.boxes[type].engines.splice(i, 1);
                if (self.boxes[type].engines.length <= 0){
                    self.boxes[type].loaded = true;
                }
            }
        }

        this.getBoxes = function(){
            var engines = oneSearch.searchAll($routeParams);

            angular.forEach(engines, function(engine, name){
                engine.response
                    .success(function(data){
                        if (angular.isDefined(data)){

                            var res = engine.getResults(data);
                            var grouped = mediaTypes.groupBy(res, engine.mediaTypes);

                            angular.forEach(grouped, function(items, type){
                                if (!self.boxes[type].results){
                                    self.boxes[type].results = {};
                                }
                                self.boxes[type].results[name] = items;

                                loadProgress(type, name);
                            });
                            //preload the engine's template for easy access for directives
                            self.engines[name] = oneSearch.getEngineTemplate(engine);
                        }
                    })
                    .error(function(msg){
                        angular.forEach(bento, function(box, name){
                            self.boxes[box].engines.filter(function(engine){
                                return name != engine;
                            })
                        })
                    });
            });
        }

    }])

    .controller('BentoCtrl', ['$scope', 'Bento', function($scope, Bento){
        this.bento = Bento;
        $scope.$on('$routeChangeSuccess', function(){
            Bento.getBoxes();
        })
    }])

    .directive('bentoBox', ['$rootScope', '$compile', 'Bento', function($rootScope, $compile, Bento){
        return {
            restrict: 'A',
            scope: {
                box: '@bentoBox'
            },
            link: function(scope, elm, attrs){

                var loaded = [];
                scope.$watch(
                    function(){
                        return Bento.boxes[scope.box];
                    },
                    function(val){
                        if (angular.isDefined(val)){
                            console.log(val.results);
                            angular.forEach(val.results, function(result, engine){
                                if (!inArray(loaded)){
                                    var eScope = $rootScope.new(true);
                                    eScope.items = val[engine];

                                    var template = angular.element(Bento.boxes.engines[engine]);
                                    var html = $compile(template)(eScope);
                                    elm.append(html);
                                    loaded.push(engine);
                                    console.log(html);
                                }
                            });
                        }


                    }
                )
            }
        }
    }])