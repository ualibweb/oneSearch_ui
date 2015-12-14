angular.module('engines.databases', [])

    /**
     * @ngdoc object
     * @name engines.type:databases
     *
     * @description
     * Engine config properties (For more details, see {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} documentation)
     *
     * | property | value |
     * |----------|-------|
     * | id       | 2     |
     * | title   | N/A *(defaults to `Databases`)*     |
     * | priority | 1     |
     * | resultsPath | `Databases.databases`     |
     * | totalsPath | `Databases.totalResults`     |
     * | mediaTypes | N/A *(appears as its own box)*    |
     * | filterQuery | N/A    |
     * | templateUrl | `common/engines/databases/databases.tpl.html` |
     * | controller | N/A |
     *
     * @requires oneSearchProvider
     */

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('databases', {
            id: 2,
            priority: 1,
            resultsPath: 'Databases.databases',
            totalsPath: 'Databases.totalResults',
            templateUrl: 'common/engines/databases/databases.tpl.html'
        })
    }])