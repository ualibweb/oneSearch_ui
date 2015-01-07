angular.module('engines.catalog', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('catalog', {
            id: 64,
            resultsPath: 'Catalog.list',
            totalsPath: 'Catalog.total',
            mediaTypes: {
                path: 'bibFormat',
                types: {
                    books: 'am',
                    journals: 'as',
                    articles: 'tm',
                    media: ['jm', 'gm']
                }
            },
            templateUrl: 'common/engines/catalog/catalog.tpl.html'
        })
    }])