angular.module('engines.recommend', [])

    /**
     * @ngdoc object
     * @name engines.type:recommend
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 16     |
     * | title   | N/A *(defaults to `Recommend`)*    |
     * | priority | 0     |
     * | resultsPath | `Recommendations`     |
     * | totalsPath | N/A     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | `N/A   |
     * | templateUrl | `common/engines/recommend/recommend.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('recommend', {
            id: 512,
            priority: 0,
            resultsPath: 'Recommendations',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        })
    }])