/**
 * Central oneSearch module that defined all components and dependencies involved
 * for the oneSearch interface.
 *
 * All modules in this app are named with their immediate parent's name prepended.
 * So, all modules at this point are perpended "oneSearch.*", and modules loaded in "oneSearch.common" are prepended with "common.*", and so on.
 * This is a lazy attempt to prevent namespace conflicts with other javascripts.
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
    })