angular.module('engines.libguides', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('libguides', {
            id: 16,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: 'site:guides.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])