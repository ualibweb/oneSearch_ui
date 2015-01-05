angular.module('engines.recommend', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('recommend', {
            id: 512,
            resultsPath: 'Recommendations',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        })
    }])

    .directive('recommend', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        }
    }])