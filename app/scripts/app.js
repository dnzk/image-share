var dependencies = ['ngResource', 'ngRoute', 'app.services', 'app.controllers', 'LocalStorageModule'];
angular.module('app', dependencies).config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "pages/main.html",
    controller: "MainPageController"
  }).when("/signin", {
    templateUrl: "pages/login.html",
    controller: "LoginController"
  }).otherwise({
    redirectTo: "/"
  });
}).run(function($rootScope, $location, localStorageService) {
  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      testAPI();
    } else if (response.status === 'not_authorized') {
    } else {
    }
  };
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
  window.fbAsyncInit = function() {
    FB.init({
      appId: '428430510640383',
      xfbml: true,
      version: 'v2.2'
    });
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));
  
  function testAPI() {
    FB.api('/me', function(response) {
      console.log('successful login for: ' + response.name);
    });
  };
  
  $rootScope.$on('$routeChangeSuccess', function(event, newUrl, oldUrl) {
    if (!localStorageService.get('userId') && !localStorageService.get('accessToken')) {
      $location.path('/signin');
    }
  });
});