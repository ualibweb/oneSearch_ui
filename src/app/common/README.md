Common Folder
============

## common.oneSearch Module

Defines the `oneSearch` Provider, allowing engines to register via the `oneSearchProvider` and search via the `oneSearch` Service. (See Angular's [Providers docs](https://code.angularjs.org/1.3.0/docs/guide/providers) for details)

The `oneSearchProvider.engine(name, params)` method is used to register searchable engines and takes two parameters: 
* name: String - The name of the search engine. MUST be machine readable (i.e., cannot being with integer, no spaces)
* params: Object - An object describing the engine. Available params:
    * id: Integer - the id of the engine for the back-end JSON response handler API
    * resultsPath: String - JSON path to the results object
    * totalsPath: String (optional) - JSON path to the total number of results found object/value
    * mediaTypes: Object (optional) - Engine specific details to identify different types of media/item <span class="text-warning">[REQUIRES MODULE: [mediaTypes](media-types)]</span>

Engines can register in the config phase by providing the engine name and parameters like so:

```javascript
angular.module('ENGINE_NAME').config(['oneSearchProvider', function(oneSearchProvider){
   
    
    oneSearchProvider.engine('ENGINE_NAME', {
    
    });

}]);
```