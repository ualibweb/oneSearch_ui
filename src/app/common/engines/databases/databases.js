angular.module('engines.databases', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('databases', {
            id: 2,
            resultsPath: 'Databases.results',
            totalsPath: 'Databases.total'
        })
    }])

    .directive('databases', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/databases/databases.tpl.html'
        }
    }])