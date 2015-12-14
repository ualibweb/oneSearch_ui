/**
 * @ngdoc overview
 * @name oneSearch
 *
 * @requires ngRoute
 * @requires ngResource
 * @requires ngAnimate
 * @requires ngSanitize
 * @requires ui-bootstrap
 * @requires angular-filter
 * @requires duScroll
 * @requires ualib-ui
 * 
 * @description
 * <p class="lead">
 *     The `oneSearch` module allows multiple search engines to be searched easily through one interface. For information on how to add new or edit existing
 * engines, see docs for the {@link oneSearch.oneSearchProvider oneSearchProvider}.
 * </p>
 *
 * _All modules in this app are named with their immediate parent's name prepended.
 * So, all modules at this point are prepended with `oneSearch.\*`, and modules loaded in `oneSearch.common` are prepended with `common.\*`, and so on.
 * This is a lazy attempt to prevent namespace conflicts with other javascripts._
 */
angular.module('oneSearch', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angular.filter',
    'duScroll',
    'ualib.ui',
    'oneSearch.common',
    'oneSearch.templates',
    'oneSearch.bento'
])
    // The URL to the main website
    .constant('UALIB_DOMAIN', '//wwwdev2.lib.ua.edu/')

    // Default search parameters
    .value('SearchParams', {
        limit: 100
    })

    .value('duScrollOffset', 81);
