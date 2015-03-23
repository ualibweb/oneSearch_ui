    .factory('dataFactory', function($http) {
        return {
            get: function(url) {
                return $http.get(url).then(function(resp) {
                    return resp.data; // success callback returns this
                });
            }
        };
    })
    .directive('suggestOneSearch', function($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                prompt: '@',
                model: '=',
                search: '='
            },
            controller: function($scope, $window, dataFactory){
                $scope.items = {};
                $scope.model = "";
                $scope.current = -1;
                $scope.originalValue = $scope.model;

                // hides the list initially
                $scope.selected = true;

                $scope.onChange = function(){
                    $scope.selected = false;
                    if ($scope.model.length > 2){
                        dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/suggest/' + $scope.model)
                            .then(function(data) {
                                $scope.items.suggest = data;
                                $scope.setCurrent(-1, false);
                            });
                        dataFactory.get('//wwwdev2.lib.ua.edu/staffDir/api/subject/' + $scope.model + '/match/startwith')
                            .then(function(data) {
                                $scope.items.subjects = data;
                            });
                    } else
                        if ($scope.model.length <= 2){
                            $scope.items = {};
                            $scope.setCurrent(-1, false);
                        }
                    $scope.originalValue = $scope.model;
                };
                $scope.go = function ( path ) {
                    $scope.model = "";
                    $scope.originalValue = $scope.model;
                    $window.location.href = path;
                };
                $scope.setCurrent = function(index, forceModel) {
                    $scope.current = index;
                    if (typeof $scope.items.suggest != 'undefined')
                        for (var i = 0; i < $scope.items.suggest.searches.length; i++)
                            $scope.items.suggest.searches[i].class = '';
                    if (index >= 0)
                        if ($scope.items.suggest.searches.length > 0){
                            if (index > $scope.items.suggest.searches.length - 1)
                                index = $scope.items.suggest.searches.length - 1;
                            if (forceModel)
                                $scope.model = $scope.items.suggest.searches[index].search;
                            $scope.items.suggest.searches[index].class = 'active';
                            $scope.current = index;
                        }
                };
                $scope.onFocus = function(){
                    if ($scope.model.length > 2){
                        $scope.selected = false;
                    }
                };
                $scope.onBlur = function($event){
                    $scope.selected = true;
                };
            },
            link: function(scope, elem, attrs) {
                elem.bind("keydown", function (event) {
                    switch(event.keyCode){
                        //ArrowUp
                        case 38:
                            if (scope.current > 0){
                                scope.setCurrent(scope.current - 1, true);
                                event.preventDefault();
                            } else {
                                scope.setCurrent(-1, false);
                                scope.model = scope.originalValue;
                                event.preventDefault();
                            }
                            break;

                        //ArrowDown
                        case 40:
                            if (scope.model.length > 2)
                                if (scope.current < scope.items.suggest.searches.length - 1){
                                    scope.setCurrent(scope.current + 1, true);
                                    event.preventDefault();
                                }
                            break;

                        //Enter
                        case 13:
                            scope.selected = true;
                            break;

                        default:
                            break;
                    }
                    scope.$apply();
                });
                scope.handleSelection = function(selectedItem) {
                    $timeout(function() {
                        scope.model = selectedItem;
                        scope.selected = true;
                        scope.$apply();
                        scope.search();
                    }, 0);
                };
            },
            templateUrl: 'common/directives/suggest/suggest.tpl.html'
        };
    })
