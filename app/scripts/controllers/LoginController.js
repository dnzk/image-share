angular.module('app.controllers').controller('LoginController', function($scope, $location, localStorageService, MainPageService, $timeout) {
  $scope.loginFacebook = function() {
    FB.login(function(response) {
      if (response.status === "connected") {
        $timeout(function() {
          $location.path('/');
        }, 950);
        localStorageService.set('userId', response.authResponse.userID);
        localStorageService.set('accessToken', response.authResponse.accessToken);
      }
    }, {scope: 'email,user_likes,user_photos,public_profile,publish_actions'});
  };
});