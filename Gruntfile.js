module.exports = function(grunt) {
  grunt.initConfig({
    http: {
      grab_data: {
        options: {
          url: 'https://docs.google.com/spreadsheets/d/151_khdlrRb9oAJ1pDXTS0hLvqNAB3C313ta3se07-so/pub?output=csv',
        },
        dest : 'src/seriesdata.csv'
      }
    },
    convert: {
      options: {
        explicitArray: false,
      },
      csv2json: {
        src: ['src/seriesdata.csv'],
        dest: 'build/seriesdata.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks('grunt-convert');

  grunt.registerTask('data', ['http', 'convert']);

};