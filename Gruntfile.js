module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            index: {
                src: 'src/index.html',
                dest: 'dist/index.html',
                options: {
                    process: true
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
                html5Mode: true,
                startPage: '/api/oneSearch',
                sourceLink: true,
                title: "oneSearch Docs",
                titleLink: "/api"
            },
            api: {
                src: ['src/**/*.js', '!src/**/*.spec.js'],
                title: 'API Documentation'
            }
        },
        'gh-pages': {
            options: {
                base: 'docs'
            },
            src: ['**']
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

    grunt.registerTask('default', ['html2js', 'concat', 'less:dev', 'clean', 'ngdocs']);
    grunt.registerTask('build', ['html2js', 'concat', 'less:build', 'ngAnnotate', 'uglify', 'clean']);
};