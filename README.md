oneSearch UI
============

> Interface for oneSearch academic federated search tool

## Getting Started

You need [Node.js](http://nodejs.org/) to use the tools that build this app. Download the proper Node.js package from their [download page](http://nodejs.org/download/).

After Node.js is installed, then you need to install [Grunt.js](http://gruntjs.com/getting-started) and [Bower](http://bower.io/) via the Node Package Manager (npm).
To do so, run the following commands:

> If you already have the Grunt Command Line Interface and Bower installed globally, skip this step.

```bash
npm install -g grunt-cli
npm install -g bower
```

### Install Grunt and Bower dependencies
If you haven't used [grunt](http://gruntjs.com) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide. 
[Bower](http://bower.io/) should be installed automatically. If you recieve an error after running the install command below, run the `bower install` command.

From the same directory as the repository's [Gruntfile.js](http://gruntjs.com/getting-started#the-gruntfile) and [package.json](http://gruntjs.com/getting-started#package.json), run the following command:

```bash
npm install
```

## Development workflow

This repo has several grunt tasks to help automate development. Below you'll find the general development/workflow tasks,
as well as sub-tasks that can be run individually when necessary.

> It is possible that these docs are not updated immediately after adding a new task. The `grunt --tasks` command can be run to list all tasks registered in the `Gruntfile.js`

### Active dev flow

**Note:** The Grunt tasks below have to be stopped manually, as they utilize file watchers and/or spawn local web servers. To end these tasks in PhpStorm click the `Stop` button from the `Run` panel, or from the console press `Ctrl`+`C`. 

#### First, test the dev build locally

1. Run this command before making changes - the app's local demo page to open automatically in your browser.

    ```bash
    grunt
    ```
    
    This will start a local web server and open the demo/test page for the app in your browser automatically. `grunt default` will run the same task as well.
    
2. Edit the source and either press `Ctrl` + `S` or wait a couple seconds; the changes will re-build and browser your refreshed automatically.

3. Once your changes are ready, commit and push to Github.

> The dev/live builds and the app's demo/test page will be built to the `/dist` folder.

#### Then, get feedback and build live

After getting feed back, then changes are ready to go live.

1. Run this command to demo a live build locally. 

    > This will open a demo of the app's live build in your browser, however, it will not `livereload` (refresh your browser). All active development should be done with a dev build via `grunt default`.
    
    ```bash
    grunt demo-live
    ```

2. If there are no build or Javascript errors, and the live build demo functions as expected, commit and push the new live build to Github.


## Documenting the source

Documentation is automatically generated from comments in Javascript and LESS files. Comments must adhere to the following syntaxes:

### Javascript Comments

Since the app is written with Angular, `ngdoc` - a flavor of `jsdoc` used by AngularJS - is the comment syntax used for document generation. 
Please see the [Writing AngularJS Documentation](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) wiki page for specifics or look at comments
in the source code for examples.

### Style Comments

Although this app currently uses [LESS](http://lesscss.org/) for styles, comments in any style sheet must use [KSS](https://kss-node.github.io/kss-node/) comment syntax.

> This app does not yet generate documentation from style sheets - this feature will be added at a later date.


## Available Grunt Tasks

Usage: `grunt [alias]` or double-click the alias from the Grunt panel in PhpStorm. Each Grunt task is actually an alias for multiple sub-tasks.

Alias | Descriptions
------------ | -------------
`default` | The default task for active development
`dev-build` | Generate dev build [runs with `default`]
`demo-live` | Run before committing a live build to demo and test.
`live-build` | Generate the live build [runs with `demo-live`]
`docs` | Task for active development of generated docs
`gh-pages` | Push generated docs to gh-pages branch (console will prompt for Github user/pass)
`bump` | Updates live build version as a *patch* release (uses semantic versioning, see [semver](http://semver.org/) and [grunt-bump](https://github.com/vojtajina/grunt-bump))
`bump:minor` | Updates live build version as a *minor* release (uses semantic versioning, see [semver](http://semver.org/) and [grunt-bump](https://github.com/vojtajina/grunt-bump))
`bump:major` | **Only use this for non-backwards compatible changes.** Updates live build version as a *major* release (uses semantic versioning, see [semver](http://semver.org/) and [grunt-bump](https://github.com/vojtajina/grunt-bump))

> There are many more tasks and sub-tasks. Check out the `Grunfile.js` file in this repo for more info.

## Common Issues

### Connection refused when trying to launch the app demo

Only one demo server can be running at a time. There may already be one active from a previously run Grunt task. 
You must end the running grunt task by clicking the `Stop` icon in PhpStorm or `Ctrl` + `C` in the console.


**What's Happening**

The default Grunt task creates a local web server and launches the app demo page, then it runs a `watch` task. This `watch` task remains running so that it can
detect file changes to automatically re-build while making changes. The `watch` will not end until you tell it to.

The `grunt-contrib-connect` module that creates the local web server to run the demo app is (currently) unable to end running grunt tasks also using [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect).
Please see see this ticket for more info: https://github.com/gruntjs/grunt-contrib-connect/issues/83

## Todo
- [x] Add Grunt `watch` and `livereload`
- [x] Add `grunt-auto-install` to automatically install/update bower and npm packages with build tasks
- [ ] Add `load-grunt-tasks` to auto register Grunt modules in Gruntfile.js
- [ ] Add `grunt-wiredep` to auto-include Bower dependencies in demo HTML
- [ ] Add `jshint` to build tasks to enforce Javascript standards
- [ ] Implement style documentation generator
