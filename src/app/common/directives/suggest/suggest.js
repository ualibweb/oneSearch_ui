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
                model: '='
            },
            controller: function($scope, dataFactory){
                $scope.items = {};
                $scope.dataRequested = false;
                $scope.isOpen = false;
                $scope.model = "";

                $scope.onItemSelected = function() { // this gets executed when an item is selected
                    console.log('selected=' + $scope.model);
                };

                $scope.onChange = function(){
                    $scope.selected = false;
                    $scope.isOpen = true;
                    if ($scope.model.length > 2 && !$scope.dataRequested){
                        dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/suggest/' + $scope.model).then(function(data) {
                            $scope.items.suggest = data;
                            console.dir(data);
                        });
                        dataFactory.get('//wwwdev2.lib.ua.edu/staffDir/api/subject/' + $scope.model + '/match/startwith').then(function(data) {
                            $scope.items.subjects = data;
                            console.dir(data);
                        });
                        $scope.dataRequested = true;
                    } else
                    if ($scope.model.length <= 2){
                        $scope.items = {};
                        $scope.dataRequested = false;
                    }
                };
            },
            link: function(scope, elem, attrs) {
                scope.handleSelection = function(selectedItem) {
                    scope.model = selectedItem;
                    scope.current = 0;
                    scope.selected = true;
                    scope.isOpen = false;
                    $timeout(function() {
                        scope.onItemSelected();
                    }, 200);
                };
                scope.current = 0;
                scope.selected = true; // hides the list initially
                scope.isCurrent = function(index) {
                    return scope.current == index;
                };
                scope.setCurrent = function(index) {
                    scope.current = index;
                };
            },
            templateUrl: '//wwwdev2.lib.ua.edu/oneSearch/templates/suggest.tpl.html'
        };
    })
