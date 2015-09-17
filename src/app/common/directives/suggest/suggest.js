angular.module('oneSearch.common')
    .factory('dataFactory', ['$http', function($http) {
        return {
            get: function(url) {
                return $http.get(url).then(function(resp) {
                    return resp.data; // success callback returns this
                });
            }
        };
    }])
    .directive('suggestOneSearch', ['$timeout', function($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                prompt: '@',
                model: '=',
                search: '='
            },
            controller: function($scope, $window, $timeout, dataFactory){
                $scope.items = {};
                $scope.filteredItems = [];
                $scope.model = "";
                $scope.current = -1;
                $scope.originalValue = $scope.model;
                $scope.dataRequested = false;
                $scope.numShow = 5;
                $scope.faqSearched = false;

                // hides the list initially
                $scope.selected = false;

                $scope.onChange = function(){
                    $scope.selected = true;
                    var fixedString = $scope.model.replace(/\//g, " ");

                    if ($scope.model.length < 3 ||
                        ($scope.model.indexOf($scope.originalValue) < 0 && $scope.model.length >= $scope.originalValue.length) ||
                        ($scope.originalValue.indexOf($scope.model) < 0 && $scope.model.length <= $scope.originalValue.length)){
                        $scope.items = {};
                        $scope.setCurrent(-1, false);
                        $scope.dataRequested = false;
                        $scope.selected = false;
                        $scope.faqSearched = false;
                    }
                    if ($scope.model.length > 2 && !$scope.dataRequested){
                        dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/suggest/' + encodeURI(fixedString))
                            .then(function(data) {
                                $scope.items.suggest = data;
                                $scope.setCurrent(-1, false);
                            });
                        $scope.dataRequested = true;
                    }
                    if ($scope.model.length > 2){
                        $timeout(function() {
                            dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/recommend/' + encodeURI(fixedString))
                                .then(function(data) {
                                    $scope.items.recommend = data;
                                });
                            dataFactory.get('//wwwdev2.lib.ua.edu/staffDir/api/subject/' + encodeURI(fixedString) + '/match/startwith')
                                .then(function(data) {
                                    $scope.items.subjects = data;
                                });
                        }, 0);
                    }
                    if ($scope.model.length > 4 && !$scope.faqSearched){
                        console.log("Checking conditions for GCS search...");
                        $timeout(function() {
                            var lastTwo = fixedString.slice(-2);
                            if (lastTwo.indexOf(" ") > 0) {
                                console.log("Running GCS search.");
                                $scope.faqSearched = true;
                                dataFactory.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=003453353330912650815:lfyr_-azrxe&q=' +
                                    encodeURI(fixedString) + '&siteSearch=ask.lib.ua.edu')
                                    .then(function (data) {
                                        // pluck out the items array for easier 'suggestWatcher' processing
                                        $scope.items.faq = data.items;
                                    });
                            }
                        }, 0);
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
                        for (var i = 0; i < $scope.items.suggest.length; i++)
                            $scope.items.suggest[i].class = '';
                    if (index >= 0)
                        if ($scope.filteredItems.length > 0){
                            if (index > $scope.filteredItems.length - 1)
                                index = $scope.filteredItems.length - 1;
                            if (forceModel)
                                $scope.model = $scope.filteredItems[index].search;
                            $scope.filteredItems[index].class = 'active';
                            $scope.current = index;
                        }
                };
                $scope.onFocus = function(){
                    if (angular.isDefined($scope.model) && $scope.model.length > 2){
                        $scope.selected = true;
                    }
                };
                $scope.onBlur = function($event){
                    $scope.selected = false;
                };
                $scope.compare = function(query){
                    return function(item){
                        if (item.search.indexOf(query) == 0 &&
                            !angular.equals(item.search.toLowerCase(), query.toLowerCase()))
                            return true;
                        return false;
                    };
                };
            },
            link: function(scope, elem, attrs) {
                scope.showSuggestions = false;
                var suggestWatcher = scope.$watch('items', function(newVal, oldVal){
                    var show = false;

                    for (var item in newVal){
                        if (item.length > 0){
                            show = true;
                            break;
                        }
                    }

                    scope.showSuggestions = (scope.model.length > 2 && show);
                }, true);

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
                            if (scope.model.length > 2 && scope.current < scope.numShow - 1)
                                if (scope.current < scope.items.suggest.length - 1){
                                    scope.setCurrent(scope.current + 1, true);
                                    event.preventDefault();
                                }
                            break;

                        //Enter
                        case 13:
                            scope.selected = false;
                            break;

                        //Backspace
                        case 8:
                        //Delete
                        case 46:
                            scope.selected = true;
                            break;

                        default:
                            break;
                    }
                    scope.$apply();
                });

                // Unbind key event when scope is destroyed
                scope.$on('$destroy', function(){
                    elem.unbind("keydown");
                    suggestWatcher();
                });

                scope.handleSelection = function(selectedItem) {
                    $timeout(function() {
                        scope.model = selectedItem;
                        scope.originalValue = "";
                        scope.items = {};
                        scope.setCurrent(-1, false);
                        scope.dataRequested = false;
                        scope.selected = false;
                        scope.faqSearched = false;
                        scope.$apply();
                        scope.search();
                    }, 0);
                };

            },
            templateUrl: 'common/directives/suggest/suggest.tpl.html'
        };
    }]);
