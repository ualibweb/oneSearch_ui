angular.module('engines.googleCS', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('googleCS', {
            id: 16,
            title: 'Libraries\' Website',
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: '-site:guides.lib.ua.edu -site:ask.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])