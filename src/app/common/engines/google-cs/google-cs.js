angular.module('engines.googleCS', [])
    /**
     * @ngdoc object
     * @name engines.type:googleCS
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title   | `Libraries' Website`    |
     * | priority | 2     |
     * | resultsPath | `GoogleCS.items`     |
     * | totalsPath | `GoogleCS.searchInformation.totalResults`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | `-site:guides.lib.ua.edu -site:ask.lib.ua.edu`    |
     * | templateUrl | `common/engines/google-cs/google-cs.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */

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