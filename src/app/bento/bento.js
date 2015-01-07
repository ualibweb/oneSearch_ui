angular.module('oneSearch.bento', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/bento/:s', {
                templateUrl: 'bento/bento.tpl.html',
                controller: 'BentoCtrl'
            })
    }])

    .service('Bento', ['$routeParams', '$filter', 'oneSearch', 'mediaTypes', function($routeParams, $filter, oneSearch, mediaTypes){
        var self = this;
        this.boxes = {};
        this.engines = {};

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

            angular.copy(mediaTypes.types, self.boxes);

            angular.forEach(self.boxes, function(box, type){
                self.boxes[type].results = {};
            });

            angular.forEach(engines, function(engine, name){
                engine.response
                    .success(function(data){
                        if (angular.isDefined(data)){

                            var res = engine.getResults(data);
                            var grouped = mediaTypes.groupBy(res, engine.mediaTypes);

                            Object.keys(self.boxes).forEach(function(type){
                                if (grouped.hasOwnProperty(type)){
                                    self.boxes[type].results[name] = $filter('limitTo')(grouped[type], 3);
                                }
                                loadProgress(type, name);
                            });

                            //preload the engine's template for easy access for directives
                            self.engines[name] = {}
                            self.engines[name].tpl = oneSearch.getEngineTemplate(engine);
                            self.engines[name].controller = oneSearch.getEngineController(engine);
                        }
                    })
                    .error(function(msg){
                        angular.forEach(self.boxes, function(box, type){
                            self.boxes[type].engines.filter(function(engine){
                                return name != engine;
                            })
                        })
                    });
            });

        }

    }])

    .controller('BentoCtrl', ['$scope', 'Bento', function($scope, Bento){
        $scope.$on('$routeChangeSuccess', function(){
            Bento.getBoxes();
        })
    }])

    .directive('bentoBox', ['$rootScope', '$controller', '$compile', '$animate', 'Bento', function($rootScope, $controller, $compile, $animate, Bento){
        return {
            restrict: 'A',
            link: function(scope, elm, attrs){
                var box = attrs.bentoBox;
                var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');
                var titleElm = elm.find('h2');
                
                $animate.enter(spinner, titleElm, angular.element(titleElm[0].lastChild));

                var boxWatcher = scope.$watch(
                    function(){
                        return Bento.boxes[box]['engines'];
                    },
                    function(newVal, oldVal) {
                        if (newVal !== oldVal){
                            var engine = '';

                            for (var i = 0, len = oldVal.length; i < len; i++){
                                var eng = oldVal[i];
                                if (!(newVal.indexOf(eng) > -1)){
                                    engine = eng;
                                    break;
                                }
                            }

                            var engineScope = $rootScope.$new(true);
                            engineScope.items = Bento.boxes[box]['results'][engine];
                            engineScope.isCollapsed = true;

                            Bento.engines[engine].tpl.then(function(data){

                                if (Bento.engines[engine].controller){
                                    var controller = $controller(Bento.engines[engine].controller, {$scope: engineScope});
                                    console.log(Bento.engines[engine].controller);
                                    elm.data('$ngControllerController', controller);
                                    elm.children().data('$ngControllerController', controller);
                                }
                                var template = angular.element('<div class="animate-repeat bento-box-item" ng-repeat="item in items">'+Bento.engines[engine].tpl.$$state.value+'</div>');
                                var html = $compile(template)(engineScope);
                                elm.append(html);
                            });

                            if (newVal.length == 0){
                                done();
                            }
                        }
                    },
                    true
                );

                function done(){
                    if (isEmpty(Bento.boxes[box]['results'])){
                        elm.append("<strong>No Results</strong>");
                        elm.addClass('text-muted');
                    }
                    $animate.leave(spinner);
                    boxWatcher();
                }
            }
        }
    }])