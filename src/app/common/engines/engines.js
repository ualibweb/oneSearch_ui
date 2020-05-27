/**
 * @ngdoc overview
 * @name engines
 *
 * @description
 * # Adding Engines to oneSearch
 * <div class="alert alert-primary">Engines are configured and registered via the `oneSearchProvider`, {@link oneSearch.oneSearchProvider#methods_engine see here for details}</div>
 *
 *
 * ## The `engines module` acts as the entry point to load engine configs.
 *
 * ## Adding engines to oneSearch
 *
 * 1. Create a directory with the engines name under ``src/app/common/engines/ENGINE_NAME``
 *      - This will contain the engine's config module, template, and LESS/CSS files
 *
 * 2. In the engines folder create the `engine config` module file: `ENGINE_NAME.js`:
 *      - **Note:** be sure to add the `@ngdoc` comments, filling in the `properties` table, so the engine info will appear in these docs! You can use the example below as a template.
 * <pre>
 *     &#47;**
 *       * @ngdoc object
 *       * @name engines.type:ENGIEN_NAME
 *       *
 *       * @description
 *       * Engine config properties
 *       *
 *       * | property | value |
 *       * |----------|-------|
 *       * | id       | ID_VAL      |
 *       * | priority | WEIGHT      |
 *       * | resultsPath | JSON_RESULTS_PATH     |
 *       * | totalsPath | TOTALS_RESULTS_PATH     |
 *       * | templateUrl | TEMPLATE_URL |
 *       * | controller |  CONTROLLER  |
 *       *
 *       * @requires oneSearchProvider
 *       *&#47;
 *
 *     angular.module('engines.ENGINE_NAME', [])
 *          .config (...)
 *          .controller(...);
 * </pre>
 *
 * 3. Create a template for engine items - this template is applied to each item in the search results individually
 *      - **Note:** template files should *always* end in `.tpl.html` (i.e., ENGINE_NAME.tpl.html)
 *
 * 4. *(optional)* Create LESS file to create custom styles for the engine's template
 *
 * 5. Add the `ENGINE_NAME` config module to the `common.engines` module's dependencies
 * <pre>
 *     angular.module('common.engines', [
 *          'engines.scout',
 *          'engines.catalog',
 *          ...
 *          'engines.ENGINE_NAME`
 *     ])
 * </pre>
 *
 */
angular.module('common.engines', [
    'engines.digitalcollections',
    'engines.catalog',
    'engines.databases',
    'engines.scout',
    'engines.googleCS',
    'engines.faq',
    'engines.libguides',
    'engines.ejournals',
    'engines.recommend',
    'engines.staffdirectory',
		'engines.youtube'
])
/**
 * @Service enginesTemplateFactory
 *
 * Used to load an engine's template, defined through params in the engine's config with the oneSearch Provider
 * Currently, only loading templates through URL and $templateCache is available.
 * TODO: Allow String templates and TemplateProviders to load engine templates.
 *
 *
 */
    /**
     * @ngdoc service
     * @name engines.enginesTemplateFactory
     *
     * @requires $http
     * @requires $templateCache
     *
     * @description
     * This service retrieves the templates registered with each engine's config.
     *
     * **Note:** Although templates can only be retrieved via URL or $templateCache at the moment, it is recommended with use the {@link engines.enginesTemplateFactory#methods_get enginesTemplateFactory.get()} method,
     * as other template config methods may be supported in the future.
     */
    .service('enginesTemplateFactory', ['$http', '$templateCache', function($http, $templateCache){

        // Generic getter to load template based on engine config
        // @param config An Engine's config Object
        /**
         * @ngdoc function
         * @name engines.enginesTemplateFactory#get
         * @methodOf engines.enginesTemplateFactory
         *
         * @param {object} config An engine's config object
         *
         * @description
         * Takes an engine's `config` object and returns a template or a promise to the template, depending on how the template is defined in the engine's config.
         **/
        this.get = function(config){
            // return template is "templateUrl" is defined. otherwise, return null
            return angular.isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl) : null;
        };

        // So far only templateUrl is supported - worked with both file and cached templates.
        // adopted from https://github.com/angular-ui/ui-router/blob/master/src/templateFactory.js
        /**
         * @ngdoc method
         * @name engines.enginesTemplateFactory#fromUrl
         * @methodOf engines.enginesTemplateFactory
         *
         * @param {string} url The URL or `$templateCache` path to the template.
         *
         * @description
         * Takes a `URL` string and returns a promise to the template. `$templateCache` will be checked first. If no cached template is found, then
         * it loads via `$http`.
         *
         * Adopted from {@link https://github.com/angular-ui/ui-router/blob/master/src/templateFactory.js}
         *
         * @returns {string|Promise.<string>} The template html as a string, or a promise
         * for that string.
         */
        this.fromUrl = function(url){
            if (url == null) return null;
            else return $http
                .get(url, {cache: $templateCache, headers: { Accept: 'text/html' }})
                .then(function(response){ return response.data});
        };

    }])
