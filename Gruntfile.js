module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist/<%= pkg.version %>/']
            },
            tests: {
                src: ['dist/<%= pkg.version %>/site']
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
        copy: {
            main: {
                files: [
                    // include static file
                    {expand: true, src: ['*.md'], dest: 'dist/<%= pkg.version %>/', filter: 'isFile'}
                ]
            },
            tests: {
                files: [
                    // include static file
                    {expand: true, cwd: 'tests/site', src: ['*'], dest: 'dist/<%= pkg.version %>/site/', filter: 'isFile'}
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
        connect: {
            test: {
                options: {
                    port: 9000,
                    hostname: '*',
                    base: 'dist/<%= pkg.version %>/'
                }
            },
            open: {
                options: {
                    port: 9999,
                    hostname: '*',
                    base: 'dist/<%= pkg.version %>/',
                    keepalive: true
                }
            }
        },

        protractor: {
            options: {
                keepAlive: false,
                configFile: "tests/config/protractor.conf.js"
            },
            run: {},
            travis: {
                options: {
                    sauceUser: 'seaves',
                    sauceKey: 'b86fb77e-06b6-4df0-9865-022bd492b167'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-protractor-runner');

    // alias for steps
    grunt.registerTask('build', ['jshint', 'clean:build', 'copy', 'uglify']);
    // grunt e2e
    grunt.registerTask('test', ['build', 'copy:tests', 'connect:test', 'protractor:travis', 'clean:tests']);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};