angular.module('engines.ejournals', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('ejournals', {
            id: 4,
            priority: 6,
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
            controller: 'EjouralsCtrl'
        })
    }])

    .controller('EjouralsCtrl', function($scope){

        var param;
        switch ($scope.mediaType){
            case 'books':
                param = 'SS_searchTypeBook=yes';
                break;
            case 'journals':
                param = 'SS_searchTypeJournal=yes';
                break;
            case 'other':
                param = 'SS_searchTypeOther=yes'
        }

        if (param){
            $scope.resourceLink = $scope.resourceLink.replace('SS_searchTypeAll=yes&SS_searchTypeBook=yes&SS_searchTypeJournal=yes&SS_searchTypeOther=yes', param);
        }
    });