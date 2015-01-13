Common Folder
============

## common.oneSearch Module

Defines the `oneSearch` Provider, allowing engines to register via the `oneSearchProvider` and search via the `oneSearch` Service. (See Angular's [Providers docs](https://code.angularjs.org/1.3.0/docs/guide/providers) for details)

The `oneSearchProvider.engine(name, params)` method is used to register searchable engines and takes two parameters: 
* **name: *String*** - The name of the search engine. MUST be machine readable (i.e., cannot being with integer, no spaces)
* **params: *Object*** - An object describing the engine. Available params:
    * **id: Integer*** - Represents the engine ID for the back-end API
    * **resultsPath: String*** - JSON path to the results object
    * **totalsPath: String (optional)*** - JSON path to the total number of results found object/value
    * **mediaTypes: Object (optional)*** - Engine specific details to identify different types of media/item [REQUIRES MODULE: [mediaTypes](media-types)]

Engines can register in the config phase by providing the engine name and parameters like so:

```javascript
angular.module('ENGINE_NAME').config(['oneSearchProvider', function(oneSearchProvider){   
    
    oneSearchProvider.engine('ENGINE_NAME', {
        id: 0,
        resultsPath: 'path.to.Results',
        totalsPath: 'path.to.totals.value',
        mediaTypes: {} //See media-types README for details
    });

}]);
```