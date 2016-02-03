module.exports = function (grunt) {
// Project configuration.
    grunt.initConfig({

        sass: {
            dist: {
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },

        concat: {
            js: {
                src: ['js/libs/**/*.js', 'js/scripts/**/*.js', 'js/api/**/*.js'],
                dest: 'build/js/scripts.js',
            },

            css: {
                src: ['css/style.css'],
                dest: 'build/css/style.css',
            },

            vendor: {
                src: ['js/vendor/*.js'],
                dest: 'build/js/vendor.js',
            },
        },

        watch: {
            js: {
                files: ['js/**/*.js'],
                tasks: ['concat'],
            },
            css: {
                files: ['css/**/*.css'],
                tasks: ['concat'],
            },
            scss : {
                files: ['sass/**/*.scss'],
                tasks: ['sass'],
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dist/output.min.js': ['js/libs/**/*.js', 'js/scripts/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat', 'uglify', 'watch', 'sass']);
}