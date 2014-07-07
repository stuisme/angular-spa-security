module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist/<%= pkg.version %>/']
            }
        },
        connect: {
            test: {
                options: {
                    port: 8000,
                    hostname: '*',
                    base: 'dist/<%= pkg.version %>/'
                }
            },
            debug: {
                options: {
                    port: 8080,
                    hostname: '*',
                    base: 'dist/<%= pkg.version %>/',
                    keepalive: true
                }
            },
            e2e : {
                options: {
                    port: 8080,
                    hostname: '*',
                    base: 'dist/<%= pkg.version %>/'
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        protractor: {
            options: {
                keepAlive: false,
                configFile: "test/config/protractor.conf.js",
                noColor: true, // If true, protractor will not use colors in its output.

                args: {
                    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
                    chromeDriver: 'node_modules/protractor/selenium/chromedriver.exe'
                }
            },
            e2e: {
                options: {
                    configFile: "test/config/protractor.dev.conf.js", // Target-specific config file
                    keepAlive: true
                }
            },
            main: {
                options: {
                    configFile: "test/config/protractor.conf.js" // Target-specific config file
                }
            }
        },
        copy: {
            main: {
                files: [
                    // include static file
                    {expand: true, src: ['*.md'], dest: 'dist/<%= pkg.version %>/', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            build: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>.min.js'
            }
        },
        concurrent: {
            e2e: {
                tasks: ['watch:e2e', 'watch:src'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        watch: {
            e2e: {
                files: ['test/**'],
                tasks: ['build', 'protractor:e2e' ]
            },
            src: {
                files: ['src/**'],
                tasks: ['build']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('build', ['jshint', 'clean:build', 'copy', 'uglify']);
    // grunt e2e
    grunt.registerTask('e2e', ['build', 'connect:e2e', 'concurrent:e2e']);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};