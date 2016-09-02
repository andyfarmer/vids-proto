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

    $scope.programs = [];

    $scope.hasData.promise.then(function() {
        $scope.globalData.forEach(function(item){
          if(!$scope.programs.includes(item.SeriesName) && item.ProgramTypeSS === $scope.category){
            $scope.programs.push(item.SeriesName);
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
  });

  $locationProvider.html5Mode(true);

});