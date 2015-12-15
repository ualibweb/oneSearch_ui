/**
 * @ngdoc overview
 * @name mediaTypes
 *
 * @description
 * The `mediaTypes` module allows engines to easily split their results, grouped into different media types. See {@link mediaTypes.mediaTypesProvider mediaTypesProvider} for more details.
 */
angular.module('common.mediaTypes', [])

    /**
     * @ngdoc service
     * @name mediaTypes.mediaTypesProvider
     *
     * @description
     * This module extends the `engine object` with a `mediaTypes` property,
     * allowing multiple engines pool their results into similar `media types`.
     *
     * The `mediaTypes` config object is defined as part of the engine's config object passed to the {@link oneSearch.oneSearchProvider#methods_engine oneSearchProvider.engine()} method.
     *
     *
     * The `mediaTypes` config object has the following properties:
     * - path *(optional)* - `{string=}` - The JSON path to the `value` that determines a media type in a results object. This path extends the `resultsPath` from the `engine object`
     * - types - `{object}` - Object where the properties are the name of the media type, and the values are the value which defines that type in the results object.
     *      - TYPE_NAME - `{string|Array.<string>}` - String or Array of strings for values that define the media type.
     *
     * # Example
     *
     * Here we have a search engine called `myEngine`. When creating the engine's config module, we specify what `mediaTypes` we want the engine's
     * results to be split into.
     *
     * Each item in the `myEngine.results` Array from the JSON response has a `metadata` object with a `type` property,
     * which defines the item's media type. Specifying the `mediaTypes.path` property as `metadata.type` will tell `oneSearch` to look for the media type
     * values under `myEngine.results[index].metadata.type`.
     *
     * Search result items that do not match `mediaTypes` defined in an engine's config will be place into the `other` media type.
     *
     * <div class="tabbable">
     *  <div class="tab-pane" title="myEngine Results">
     *      With the given `myEngine Config` and `JSON Response`, the search results would be organized by `mediaTypes`.
     *
     *      **Note:** all types not defined in `mediaTypes.types` of the `myEngine's` config are put into an `other` type
     *
     *      <div class="well">
     *      <ul>
     *          <li>
     *              `books`
     *              <ul>
     *                  <li>`Title of Book`</li>
     *                  <li>`Title of E-Book`</li>
     *              </ul>
     *          </li>
     *          <li>
     *              `articles`
     *              <ul>
     *                  <li>`Title of Journal Article`</li>
     *              </ul>
     *          </li>
     *          <li>
     *              `other`
     *              <ul>
     *                  <li>`Title of Audio Recording`</li>
     *              </ul>
     *          </li>
     *      </ul>
     *      </div>
     *  </div>
     *  <div class="tab-pane" title="myEngine Config">
     *      <pre>
              angular.module('engines.myEngine', [])

               .config(['oneSearchProvider', function(oneSearchProvider){
                    oneSearchProvider.engine('myEngine', {
                        id: 90,
                        priority: 15,
                        resultsPath: 'myEngine.results',
                        mediaTypes: {
                            path: 'metadata.type',
                            types: {
                                books: ['book', 'ebook'],
                                articles: 'academicJournal'
                            }
                        }
                    });
                });
        </pre>
     *  </div>
     *  <div class="tab-pane" title="JSON Response">
     *      <pre>
     *          {
     *          "myEngine": {
     *              "results": [
     *                  {
     *                      "title": "Title of Book",
     *                      "metadata": {
     *                          "type": "book"
     *                      }
     *                  },
     *                  {
     *                      "title": "Title of E-Book",
     *                      "metadata": {
     *                          "type": "ebook"
     *                      }
     *                  },
     *                  {
     *                     "title": "Title of Journal Article",
     *                      "metadata": {
     *                          "type": "academicJournal"
     *                      }
     *                  },
     *                  {
     *                      "title": "Title of Audio Recording",
     *                      "metadata": {
     *                          "type": "audio"
     *                      }
     *                  }
     *              ]
     *          }
     *      }
     *      </pre>
     *  </div>
     * </div>
     */

    .provider('mediaTypes', [function mediaTypesProvider(){
        // Private Object for registered types
        var _types = {
            other: {
                engines: [],
                loaded: false
            }
        };

        // Register a media type and associate it with a given engine
        // These are only the anticipated media types - registered engines have no results
        // associated with a type, the type will be removed for that search.
        /**
         * @ngdoc method
         * @name mediaTypes.mediaTypesProvider#type
         * @methodOf mediaTypes.mediaTypesProvider
         *
         * @param {string} type The `type` of media to look in an engine's search results
         * @param {string} engine The name of the engine, defined when registering an engine with the {@link oneSearch.oneSearchProvider oneSearchProvider}.
         *
         * @description
         * This method is used by the {@link oneSearch.oneSearchProvider oneSearchProvider} to organize engines by their media types,
         * if specified in the {@link oneSearch.oneSearchProvider#methods_engine engine object}.
         *
         * A `mediaTypes` property is looked for in the `engine` object. If no `mediaTypes` property is found, the engine is considered as its own media type.
         *
         */
        this.type = function(type, engine){
            if (!_types[type]){
                _types[type] = {
                    engines: [],
                    loaded: false
                };
            }
            if (!(_types['other'].engines.indexOf(engine) > -1)){
                //Automatically assume the registered engine will contain 'other' media types
                _types['other'].engines.push(engine);
            }
            _types[type].engines.push(engine);

        };

        // Helper function
        // will return a new object to map results from an engines results
        // This helps drive the 'mediaTypes' property for engine configuration
        function buildGroups(types){
            var groups = {};

            angular.forEach(types, function(value, type){
                var v = {};
                switch (typeof value){
                    case 'string':
                    case 'number':
                        value = [value];
                        break;
                    case 'object':
                        value = toArray(value);
                        break;
                }
                v[type] = value;

                //function at: /common/helpers/invert-array-to-object.js
                // This was the best name I could think of so far for this type of operation.
                // If you can think of a better name, let me know!
                // Honestly, I had almost no clue what to call it...
                v = invertArrayToObject(v);
                angular.extend(groups, v);
            });
            return groups;
        }

        /**
         * @ngdoc service
         * @name mediaTypes.mediaTypes
         *
         * @requires $parse
         */

        this.$get = ['$parse', function($parse){
            return {
                /**
                 * @ngdoc object
                 * @name mediaTypes.mediaTypes#types
                 * @propertyOf mediaTypes.mediaTypes
                 *
                 * @description
                 * The `types` object contains results from engines organized by media type.
                 */
                types: _types,

                // Heavily influenced by angular-filter's group-by function:
                // https://github.com/a8m/angular-filter/blob/master/src/_filter/collection/group-by.js
                /**
                 * @ngdoc method
                 * @name mediaTypes.mediaTypes#groupBy
                 * @methodOf mediaTypes.mediaTypes
                 *
                 * @param {object} collection The `collection` object containing an engine's search results
                 * @param {string|object} media The`mediaTypes` object defined in and engine's config. If no `mediaTypes` were defined, then the name of the engine is used
                 * @returns {object} Returns an object organizing the results by `mediaType`
                 *
                 */
                groupBy: function(collection, media){
                    var result = {};

                    if (angular.isObject(media)) {
                        var groups = buildGroups(media.types);
                        var getter = $parse(media.path);
                        var prop;
                        var g;

                        angular.forEach(collection, function(item){
                            prop = getter(item);
                            g = groups[prop];

                            //If not a registered media type, put into 'other' catch-all type
                            if (angular.isUndefined(g)){
                                if(!result['other']) {
                                    result['other'] = [];
                                }
                                result['other'].push(item);
                            }
                            else{
                                if (!result[g]){
                                    result[g] = [];
                                }
                                result[g].push(item);
                            }
                        });
                    }
                    else{
                        result[media] = collection;
                    }
                    return result;
                }
            }
        }];
    }]);