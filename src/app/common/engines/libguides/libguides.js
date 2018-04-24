angular.module('engines.libguides', [])

    /**
     * @ngdoc object
     * @name engines.type:libguides
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title   | `Research Guides`    |
     * | priority | 2     |
     * | resultsPath | `GoogleCS.items`     |
     * | totalsPath | `GoogleCS.searchInformation.totalResults`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | `site:guides.lib.ua.edu`    |
     * | templateUrl | `common/engines/google-cs/google-cs.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('libguides', {
            id: 256,
            title: 'Research Guides',
            priority: 2,
            resultsPath: 'LibGuides',
            templateUrl: 'common/engines/libguides/libguides.tpl.html'
        })
    }])