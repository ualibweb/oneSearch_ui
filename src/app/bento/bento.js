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
                            self.engines[name] = oneSearch.getEngineTemplate(engine);
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

    .directive('bentoBox', ['$rootScope', '$compile', '$animate', 'Bento', function($rootScope, $compile, $animate, Bento){
        return {
            restrict: 'A',
            scope: {
                box: '@bentoBox'
            },
            link: function(scope, elm, attrs){
                var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');
                var titleElm = elm.find('h2');

                $animate.enter(spinner, titleElm, angular.element(titleElm[0].lastChild));

                var boxWatcher = scope.$watch(
                    function(){

                        return Bento.boxes[scope.box]['engines'];
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

                            var eScope = $rootScope.$new(true);
                            eScope.items = Bento.boxes[scope.box]['results'][engine];
                            eScope.isCollapsed = true; //Need to manually inject controller that can be specified by each engine's config, instead of putting in scope vars generically.

                            var template = angular.element('<div class="animate-repeat bento-item" ng-repeat="item in items">'+Bento.engines[engine].$$state.value+'</div>');
                            var html = $compile(template)(eScope);
                            elm.append(html);

                            if (newVal.length == 0){
                                $animate.leave(spinner);
                                boxWatcher();
                            }
                        }
                    },
                    true
                )
            }
        }
    }])