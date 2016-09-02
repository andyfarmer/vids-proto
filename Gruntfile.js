module.exports = function(grunt) {
  grunt.initConfig({
    http: {
      grab_data: {
        options: {
          url: 'https://docs.google.com/spreadsheets/d/151_khdlrRb9oAJ1pDXTS0hLvqNAB3C313ta3se07-so/pub?output=csv',
        },
        dest : 'src/seriesdata.csv'
      }
    }
  });

  grunt.loadNpmTasks('grunt-http');

  grunt.registerTask('data', ['http']);

};