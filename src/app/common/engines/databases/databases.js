angular.module('engines.databases', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('databases', {
            id: 2,
            resultsPath: 'Databases.results',
            totalsPath: 'Databases.total',
            templateUrl: 'common/engines/databases/databases.tpl.html'
        })
    }])

    .directive('databases', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/databases/databases.tpl.html'
        }
    }])