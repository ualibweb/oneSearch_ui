SRC Folder
============

The `index.html` will be processed, filling in any [grunt templates](http://gruntjs.com/configuring-tasks#templates) (if defined), then placing in built index file the `dist` folder.

## Organization

This application should be organized on the follow principal:

> Break the application into unique route and common components. Using both file and module dependency structures to isolate unique routes and expose common components.

**Routes** and **common components** are both [Angular modules](https://code.angularjs.org/1.3.0/docs/guide/module), but are treated differently. A **route** is a page or view within the application, defined using [ngRoute](https://code.angularjs.org/1.3.0/docs/api/ngRoute) (or another angular routing system). 
**Common components** are components that can be used by any route or component, and are exposed by being listed as dependencies of the `oneSearch.common` module. Components unique to a **route**, should be placed in that route's context.

### File Structure

Place each **route** in it's own folder, all **common components** in the `common` folder, and all global/vendor assets in the `assets` folder:

- app
    - ROUTE-FOLDER-1
        - ROUTE-COMPONENT-1
    - ROUTE-FOLDER-2
    - common
        - COMMON-COMPONENT-1
            - SUB_COMPONENT-1
        - COMMON-COMPONENT-2
- assets
    - css
    - img
    - fonts
    - vendor
        - VENDOR-FOLDER-1
        - VENDOR-FOLDER-2

### Module Dependency Structure

Each module's name is prefixed by the name of it's immediate parent module. This is a lazy attempt to prevent namespace conflicts with other JS applications, without having long module names in the dependency arrays.

Given the example folder structure above for `app`, the module names would be named like so:
- `oneSearch`
    - `oneSearch.routeFolder1`
        - `routeFolder1.routeComponent1`
    - `oneSearch.routeFolder2`
    - `oneSearch.common`
        - `common.commonComponent1`
            - `commonComponent1.subComponent1`
        - `common.commonComponent2`