angular.module('engines.catalog', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('catalog', {
            id: 64,
            resultsPath: 'Catalog.list',
            totalsPath: 'Catalog.total',
            mediaTypes: {
                path: 'bibFormat',
                types: {
                    books: ['aa','ac', 'ad', 'am'],
                    journals: ['ab','as','bb','bs','cb','cs','db','ds','eb','es','fb','fs','gb','gs','ib','is','jb','js','kb','ks','mb','ms','ob','os','pb','ps','rb','rs','tb','ts'],
                    media: ['ca','cc','cd','cm','da','dc','dd','dm','ga','gc','gd','gm','ia','ic','id','im','ja','jc','jd','jm','ka','kc','kd','km','oa','oc','od','om','ra','rc','rd','rm']
                }
            },
            templateUrl: 'common/engines/catalog/catalog.tpl.html'
        })
    }])