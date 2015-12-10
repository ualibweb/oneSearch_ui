angular.module('engines.acumen', [])

    /**
     * @ngdoc object
     * @name engines.type:acumen
     *
     * @description
     * Acumen engine config
     *
     * @requires oneSearchProvider
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