angular.module('app.controllers').controller('MainPageController', function($scope, MainPageService, $timeout, localStorageService, $location) {
  $scope.logoutFacebook = function() {
    FB.logout(function(response) {
      if (response.status !== 'connected') {
        localStorageService.remove('userId');
        localStorageService.remove('accessToken');
        $timeout(function() {
          $location.path('/signin');
        }, 950);
      }
    });
  };
  $scope.prev = function() {
    if (MainPageService.prevPage) {
      MainPageService.getEveryPhoto(MainPageService.prevPage).then(function(response) {
        if (parseInt(response.status) === 200 && response.statusText === "OK") {
          $scope.photoList = response.data.data;
          if (response.data.paging.next) {
            MainPageService.nextPage = response.data.paging.next;
          }
          if (response.data.paging.previous) {
            MainPageService.prevPage = response.data.paging.previous;
          }
        }
      });
    }
  };
  $scope.next = function() {
    if (MainPageService.nextPage) {      
      MainPageService.getEveryPhoto(MainPageService.nextPage).then(function(response) {
        if (parseInt(response.status) === 200 && response.statusText === "OK") {
          $scope.photoList = response.data.data;
          MainPageService.nextPage = response.data.paging.next;
          if (response.data.paging.previous) {
            MainPageService.prevPage = response.data.paging.previous;
          }
        }
      });
    }
  };
  $scope.share = function(photo) {
    MainPageService.publishPhoto(photo.link).then(function(response) {
      $scope.shared = true;
      $timeout(function() {
        $scope.shared = false;
      }, 2000);
    });
  };
  var init = function() {
    MainPageService.getProfileData().then(function(response) {
      if (parseInt(response.status) === 200 && response.statusText === "OK") {
        $scope.profileFirstName = response.data.first_name;
        $scope.profileLastName = response.data.last_name;
        $scope.profileFullName = response.data.name;
      }
    });
    MainPageService.getProfilePicture().then(function(response) {
      if (parseInt(response.status) === 200 && response.statusText === "OK") {
        $scope.profilePicUrl = response.data.data.url;
      }
    });
    MainPageService.getEveryPhoto().then(function(response) {
      if (parseInt(response.status) === 200 && response.statusText === "OK") {
        $scope.photoList = response.data.data;
        MainPageService.nextPage = response.data.paging.next;
        if (response.data.paging.previous) {
          MainPageService.prevPage = response.data.paging.previous;
        }
      }
    });
  }();
});