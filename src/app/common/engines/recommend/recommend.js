angular.module('engines.recommend', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('recommend', {
            id: 512,
            resultsPath: 'Recommendations'
        })
    }])

    .directive('recommend', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        }
    }])