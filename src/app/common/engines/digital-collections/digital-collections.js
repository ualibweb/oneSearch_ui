angular.module('engines.digitalcollections', [])

    /**
     * @ngdoc object
     * @name engines.type:digitalCollections
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property    | value                                                                                 |
     * |-------------|---------------------------------------------------------------------------------------|
     * | id          | 8                                                                                     |
     * | priority    | 3                                                                                     |
     * | resultsPath | `digitalCollections.items`                                                            |
     * | templateUrl | `common/engines/digital-collections/digital-collections.tpl.html`                     |
     *
     * @requires oneSearch.oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider) {
        oneSearchProvider.engine('digitalcollections', {
            id: 8,
            title: 'Digital Collections',
            priority: 3,
            resultsPath: 'digitalCollections.items',
            templateUrl: 'common/engines/digital-collections/digital-collections.tpl.html',
        })
    }]);
