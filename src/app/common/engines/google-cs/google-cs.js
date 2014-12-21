angular.module('engines.googleCS', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('googleCS', {
            id: 16,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults'
        })
    }])

    .directive('googleCs', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        }
    }])