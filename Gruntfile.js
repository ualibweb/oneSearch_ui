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
                dest: 'dist/onesearch-templates.js',
                module: 'oneSearch.templates'
            }
        },
        concat: {
            dist: {
                src: ['src/app/**/*.js'],
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
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '**/*.js',
                    dest: 'dist',
                    ext: '-<%= pkg.version %>.min.js'
                }]
            }
        },
        less:   {
            all: {
                files: {
                    'dist/onesearch.css': 'src/**/*.less'
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'dist',
                src: ['*.css', '!*.min.css'],
                dest: 'dist',
                ext: '-<%= pkg.version %>.min.css'
            }
        },
        clean: {
            js: ['dist']
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['clean', 'html2js', 'concat', 'less','cssmin', 'ngAnnotate', 'uglify']);
};