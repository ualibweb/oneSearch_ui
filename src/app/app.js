/**
 * Central oneSearch module that defined all components and dependencies involved
 * for the oneSearch interface.
 */
angular.module('oneSearch', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'angular.filter',
    'oneSearch.common',
    'oneSearch.templates',
    'oneSearch.bento'
])
    // The URL to the backend JSON resource handler
    .constant('JSON_URL', 'https://wwwdev2.lib.ua.edu/oneSearch/getJSON.php')

    // Default search parameters
    .value('SearchParams', {
        pp: 100
    });