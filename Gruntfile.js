module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist/<%= pkg.version %>/']
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // alias for steps
    grunt.registerTask('build', ['jshint', 'clean:build', 'copy', 'uglify']);
    // grunt e2e
    grunt.registerTask('e2e', ['build', 'connect:e2e', 'concurrent:e2e']);

    // Default task(s).
    grunt.registerTask('default', ['build']);

};