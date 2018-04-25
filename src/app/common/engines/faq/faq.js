angular.module('engines.faq', [])

    /**
     * @ngdoc object
     * @name engines.type:faq
     *
     * @description
     * Engine config properties
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title | N/A *(defaults to `FAQ`)* |
     * | priority | 2     |
     * | resultsPath | `GoogleCS.items`     |
     * | totalsPath | `GoogleCS.searchInformation.totalResults`     |
     * | mediaTypes | N/A *(Appears as it's own box)*     |
     * | filterQuery | `site:ask.lib.ua.edu`  |
     * | templateUrl | `common/engines/google-cs/google-cs.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */
    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('faq', {
            id: 16,
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: 'site:ask.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])