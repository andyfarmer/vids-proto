module.exports = function(grunt) {
  var images =[];

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
        dest: 'build/data/seriesdata.json'
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

  grunt.registerTask('images', function(){
    var bannersData = grunt.file.readJSON('build/data/seriesdata.json');

    bannersData.forEach(function(image){
      images.push(image.BannerURL);
    });
    grunt.task.run('download');
  });

};