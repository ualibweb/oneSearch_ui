module.exports = function(grunt){
    var serveStatic = require('serve-static');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ]
        },
        html2js: {
            app: {
                options:{
                    base: 'src/app',
                    process: true
                },
                src: 'src/app/**/*.tpl.html',
                dest: 'tmp/templates.js',
                module: 'oneSearch.templates'
            }
        },
        concat: {
            app: {
                src: ['tmp/templates.js', 'src/app/**/*.js'],
                dest: 'dist/onesearch.js'
            },
            demo: {
                options: {
                    process: true
                },
                src: 'src/index.html',
                dest: 'dist/index.html'
            }
        },
        dev_prod_switch: {
            dev: {
                options: {
                    environment: 'dev'
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            },
            live: {
                options: {
                    environment: 'prod'
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        'dist/onesearch.js': ['dist/onesearch.js']
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            app: {
                files: {
                    'dist/onesearch.min.js': ['dist/onesearch.js']
                }
            }
        },
        less: {
            dev: {
                files: {
                    'dist/onesearch.css': ['src/**/*.less']
                },
                options: {
                    compress: false,
                    sourceMap: true,
                    sourceMapFilename: 'dist/<%= pkg.name %>.css.map'
                }
            },
            build: {
                files: {
                    'dist/onesearch.min.css': ['src/**/*.less']
                },
                options: {
                    compress: true
                }
            }
        },
        clean: {
            app: ['tmp/']
        },
        watch: {
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:dev']
            },
            ng: {
                files: ['src/**/*.js', 'src/**/*.tpl.html'],
                tasks: ['html2js', 'concat:app', 'clean', 'ngdocs']
            },
            index: {
                files: ['src/index.html'],
                tasks: ['concat:demo', 'dev_prod_switch:dev']
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: ['dist/**/*', 'docs/**/*']
            }
        },
        connect: {
            live: {
                options: {
                    open: true,
                    keepalive: true,
                    hostname: 'localhost',
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html'
                        }
                    },
                    middleware: function(connect) {
                        return [
                            serveStatic('.tmp'),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('./dist')
                        ];
                    }
                }
            },
            dev: {
                options: {
                    livereload: true,
                    open: true,
                    hostname: 'localhost',
                    base: {
                        path: 'dist',
                        options: {
                            index: 'index.html'
                        }
                    },
                    middleware: function(connect) {
                        return [
                            serveStatic('.tmp'),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic('./dist')
                        ];
                    }
                }
            },
            docs: {
                options: {
                    livereload: true,
                    open: true,
                    hostname: 'localhost',
                    base: {
                        path: 'docs',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                startPage: 'api/oneSearch',
                sourceLink: true,
                title: "oneSearch Docs",
                titleLink: "api/oneSearch"
            },
            api: {
                src: ['src/**/*.js', '!src/**/*.spec.js'],
                title: 'API Documentation'
            },
            guide: {
                src: ['src/guide/**/*.ngdoc'],
                title: 'Guide'
            }
        },
        'gh-pages': {
            options: {
                base: 'docs'
            },
            firstTarget: {
                src: ['**/*']
            }
        },
        auto_install: {
            local: {}
        }
    });

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-dev-prod-switch');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-auto-install');

    grunt.registerTask('default', ['dev-build', 'dev_prod_switch:dev', 'connect:dev', 'watch']);
    grunt.registerTask('dev-build', ['auto_install', 'html2js', 'concat', 'ngdocs', 'less:dev', 'clean', 'dev_prod_switch:dev']);
    grunt.registerTask('live-build', ['auto_install', 'html2js', 'concat', 'ngdocs', 'less:build', 'ngAnnotate', 'uglify', 'clean', 'dev_prod_switch:live']);

    grunt.registerTask('docs', ['connect:docs', 'watch']);
    grunt.registerTask('demo-live', ['live-build', 'dev_prod_switch:live', 'connect:live']);
};