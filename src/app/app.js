/**
 * @ngdoc overview
 * @name index
 * @description
 * # Quick Start
 *
 * Run the following commands to install:
 *
 * ```shell
 * npm install
 * bower install
 * ```
 *
 * <div class="alert alert-warning">
 *     If you are unfamiliar with **Node.js**, **Grunt**, or **Bower** tools *or* have not installed them on your computer,
 *     read through the instructions in the [Getting Started](#getting-started) section.
 * </div>
 *
 * # Getting Started
 *
 * This package requires[Node.js](http://nodejs.org/) - an application platform which many development and automation tools may be run.
 * Download [Node.js](http://nodejs.org/download/) and install it on your computer.
 *
 * > The **Node.js** platform is used to run development tools such as [Grunt](#getting-started_install-grunt) and [Bower](#getting-started_install-bower)
 *
 * Once `Node.js` is installed, use the `npm` (node package manager) command to install this project's node dependencies:
 *
 * ```shell
 * npm install
 * ```
 *
 * <div class="alert alert-info">
 *     When the [npm install](https://docs.npmjs.com/cli/install) command is run without a package (e.g., `npm install <package_name>`),
 *     it installs dependencies listed in the `package.json` file (located in the root directory of this project).
 * </div>
 *
 *
 * ## Install Grunt
 * *This package requires Grunt `~0.4.5`*
 *
 * If you have not already installed `Grunt` on your computer, use the following command to install the `Grunt Command Line Interface (grunt-cli)`:
 *
 * ```shell
 * npm install -g grunt-cli
 * ```
 * <div class="alert alert-info">
 *     The **-g** option installs `grunt-cli` globally on you computer. You only need to run this command once.
 * </div>
 *
 * > If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide,
 * > as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
 *
 *
 * ## Install Bower
 *
 * If `Bower` is not globally installed on your computer, run the following command:
 *
 * ```shell
 * npm install -g bower
 * ```
 *
 * [Bower](http://bower.io/) is also a package manager for front-end web frameworks such as jQuery, Angular, and Bootstrap.
 * This project uses Bower to manage front-end third-party and peer dependencies.
 *
 * Once installed, you can download this project's `Bower` dependencies with the following command:
 *
 * ```shell
 * bower install
 * ```
 *
 * <div class="alert alert-info">
 *     Similar to `npm install` if `Bower's install` command is not given a package name (e.g., `bower install <package_name>`), it will install
 *     dependencies listed in the `bower.json` config file.
 * </div>
 */
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
 * @requires ualib-ui
 * 
 * @description
 * <p class="lead">
 *     The `oneSearch` module allows multiple search engines to be searched easily through one interface. For information on how to add new or edit existing
 * engines, see docs for the {@link oneSearch.oneSearchProvider oneSearchProvider}.
 * </p>
 *
 * _All modules in this app are named with their immediate parent's name prepended.
 * So, all modules at this point are prepended with `oneSearch.*`, and modules loaded in `oneSearch.common` are prepended with `common.*`, and so on.
 * This is a lazy attempt to prevent namespace conflicts with other javascripts._
 */
angular.module('oneSearch', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angular.filter',
    'ualib.ui',
    'oneSearch.common',
    'oneSearch.templates',
    'oneSearch.bento'
])
    // The URL to the main website
    .constant('UALIB_DOMAIN', '//wwwdev2.lib.ua.edu/')

    // Default search parameters
    /**
     * @ngdoc service
     * @name oneSearch.SearchParams
     *
     * @description
     * `Value` service for default search params.
     * These defaults can be overwritten when using the {@link oneSearch.oneSearch#methods_searchAll oneSearch.searchAll()} method.
     * For more deatils on Angular `Value` services, see their {@link https://code.angularjs.org/1.2.29/docs/guide/providers#value-recipe Value Recipe} documentation.
     */
    .value('SearchParams', {
        limit: 100
    });
