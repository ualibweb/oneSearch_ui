angular.module('engines.ejournals', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('ejournals', {
            id: 4,
            resultsPath: 'eJournals.results',
            totalsPath: 'eJournals.total',
            mediaTypes: {
                path: 'type',
                types: {
                    books: 'book',
                    journals: 'periodical'
                }
            }
        })
    }])

    .directive('ejournals', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/ejournals/ejournals.tpl.html'
        }
    }])