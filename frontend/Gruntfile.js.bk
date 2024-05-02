module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      uglify: {
        build: {
          src: 'public/javascripts/*.js',
          dest: 'public/javascripts/build/aplication.min.js'
        }
      },
      cssmin: {
        target: {
          files: {
            'public/stylesheets/build/aplication.min.css' : ['public/stylesheets/*.css']
          }
        }
      },
    });
  
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['uglify', 'cssmin']);
  
  };