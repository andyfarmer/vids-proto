module.exports = function(grunt) {
  var images =[];

  var bannersData = grunt.file.readJSON('build/seriesdata.json');

  bannersData.forEach(function(image){
    images.push(image.BannerURL);
  });

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
    },
    download: {
      banner_images: {
        src:      images,
        dest:     'build/series-banners/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-http-download');

  grunt.registerTask('data', ['http', 'convert']);

  grunt.registerTask('images', ['download']);

};