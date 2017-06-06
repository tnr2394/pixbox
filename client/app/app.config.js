angular.module('fileUplode')
.config(['$httpProvider',function($httpProvider){
   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  
  // $stateProvider
  // .state('home',{
  //   url : '/',
  //   templateUrl: 'gust/view/home.html',
  //   controller: 'gustHomectrl'
  // })
  // $urlRouterProvider.otherwise('/');
}])
  .run(['$rootScope','$window',function($rootScope,$window){
  }]);
