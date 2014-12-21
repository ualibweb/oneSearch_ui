angular.module('engines.acumen', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('acumen', {
            id: 8,
            resultsPath: 'Acumen.data',
            totalsPath: 'Acumen.metadata.numFound'
        })
    }])

    .directive('acumen', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/acumen/acumen.tpl.html'
        }
    }])