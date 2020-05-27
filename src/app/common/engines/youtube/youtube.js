angular.module('engines.youtube', [])

    /**
     * @ngdoc object
     * @name engines.type:youtube
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property    | value                                     |
     * |-------------|-------------------------------------------|
     * | id          | 4096                                      |
     * | priority    | 3                                         |
     * | resultsPath | `youtube.items`                           |
     * | templateUrl | `common/engines/youtube/youtube.tpl.html` |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider) {
        oneSearchProvider.engine('youtube', {
            id: 4096,
            title: 'YouTube',
            priority: 3,
            resultsPath: 'YouTube.items',
            templateUrl: 'common/engines/youtube/youtube.tpl.html',
        })
    }]);
