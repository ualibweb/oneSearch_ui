angular.module('engines.acumen', [])

    /**
     * @ngdoc object
     * @name engines.type:acumen
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 8     |
     * | title      | N/A *(defaults to `Acumen`)*    |
     * | priority | 3     |
     * | resultsPath | `Acumen.data`     |
     * | totalsPath | `Acumen.metadata.numFound`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | N/A  |
     * | templateUrl | `common/engines/acumen/acumen.tpl.html` |
     * | controller | {@link engines.type:acumen:AcumenCtrl AcumenCtrl} |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('acumen', {
            id: 8,
            priority: 3,
            resultsPath: 'Acumen.data',
            totalsPath: 'Acumen.metadata.numFound',
            templateUrl: 'common/engines/acumen/acumen.tpl.html',
            controller: 'AcumenCtrl'
        })
    }])

    /**
     * @ngdoc controller
     * @name engines.type:acumen:AcumenCtrl
     *
     * @description
     * Adds a `type` property to each item to display, from genres that may return with the API results.
     * <mark>TODO:</mark>   add proper description.
     */

    .controller('AcumenCtrl', function($scope, $filter){
        var items = $scope.items;

        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].type) {
                //console.log(items[i].type);
                if (items[i].type[0] == 'text' && items[i].details && items[i].details.genre) items[i].type = items[i].details.genre.sort().shift();
                else items[i].type = items[i].type.sort().shift();
            }
        }
    });