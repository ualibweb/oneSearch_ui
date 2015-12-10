angular.module('engines.recommend', [])

    /**
     * @ngdoc object
     * @name engines.type:recommend
     *
     * @description
     * recommend engine config
     *
     * @requires oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('recommend', {
            id: 512,
            priority: 0,
            resultsPath: 'Recommendations',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        })
    }])