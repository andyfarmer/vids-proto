var App = angular.module('vidsApp', ['ngRoute']);

App.run(function($rootScope, $http, $q){

  $rootScope.hasData = $q.defer();

  $http.get('/data/seriesdata.json').success (function(data){
    $rootScope.globalData = data;
    $rootScope.hasData.resolve();
  });

});

App.controller('MainController', function($scope, $route, $routeParams, $location) {
   $scope.$route = $route;
   $scope.$location = $location;
   $scope.$routeParams = $routeParams;
})

App.controller('HomeController', function($scope, $routeParams) { 

    $scope.categories = ["Factual", "Movie", "Scripted", "Formats"];
 
});

App.controller('CategoryController', function($scope, $routeParams) {

    $scope.category = $routeParams.categoryId;

    $scope.bannerImage = 'http://placehold.it/1300x400';

    $scope.programs = [];

    $scope.featured = [];

    $scope.hasData.promise.then(function() {
        $scope.globalData.forEach(function(item){
          if(item.ProgramTypeSS === $scope.category){
            var program = {
              id : item.SeriesID, 
              name : item.SeriesName
            }
            $scope.programs.push(program);
            if(item.IsFeatured === "TRUE"){
              var fullBannerPath = item.BannerURL.split('/');
              program.thumbnailImage = fullBannerPath[fullBannerPath.length - 1];
              $scope.featured.push(program);
            }
          }
        });
    });
 
});

App.controller('SeriesController', function($scope, $routeParams) {

  $scope.hasData.promise.then(function() {
    $scope.globalData.forEach(function(item){
      if(item.SeriesID === $routeParams.seriesId){
        var fullBannerPath = item.BannerURL.split('/'),
            bannerFileName = fullBannerPath[fullBannerPath.length - 1];

        $scope.bannerImage = bannerFileName;
        $scope.series = item.SeriesName;
        $scope.seasonCount = item.SeasonCount;
        $scope.episodeCount = item.EpisodeCount;
        $scope.channel = item.PrimaryNetworkName;
        $scope.productionCompany = item.ProductionCompany;
        $scope.promoImage = item.PromoImageURL;
        $scope.trailerImage = item.TrailerImageURL;
        $scope.spanishImage = item.SpanishImageURL;

      }
    });
  });


});

App.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/categories.html',
    controller: 'HomeController'
  })
  .when('/category/:categoryId', {
    templateUrl: '/category.html',
    controller: 'CategoryController'
  })
  .when('/series/:seriesId', {
    templateUrl: '/series.html',
    controller: 'SeriesController'
  });

  $locationProvider.html5Mode(true);

});