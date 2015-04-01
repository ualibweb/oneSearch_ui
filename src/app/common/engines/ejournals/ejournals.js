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
            },
            templateUrl: 'common/engines/ejournals/ejournals.tpl.html',
            controller: ['$scope', function($scope){
                for (var i = 0, len = $scope.items.length; i < len; i++){
                    //console.log($scope.items);
                }
            }]

        })
    }])