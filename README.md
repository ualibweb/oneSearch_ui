oneSearch_ui
============

Interface for oneSearch academic federated search tool

Still in alpha. No bower dependencies specified as of yet (just using CDNs and RawGit atm), but everything will build properly to a `dist` folder.

# Building the oneSearch UI

## First Steps

You need [Node.js](http://nodejs.org/) to use the tools that build the CSS and the Styleguide. Download the proper Node.js package from their [download page](http://nodejs.org/download/).

After Node.js is installed, then you need to install [Grunt.js](http://gruntjs.com/getting-started).
To do so, run the following commands:

```bash
npm install -g grunt-cli
```

## Install Grunt dependencies
If you haven't used [grunt][http://gruntjs.com] before, be sure to check out the [Getting Started][http://gruntjs.com/getting-started] guide.

From the same directory as the repository's [Gruntfile.js][http://gruntjs.com/getting-started#the-gruntfile] and [package.json][http://gruntjs.com/getting-started#package.json], run the following command:

```bash
npm install
```

## Build it!

After running the following command, the files will be built to the _/dist_ folder.

```bash
grunt
```