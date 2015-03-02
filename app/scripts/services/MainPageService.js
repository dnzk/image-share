angular.module('app.services').factory('MainPageService', function($http, $q, localStorageService) {
  var _base = "https://graph.facebook.com/v2.2/";
  var main = {
    getProfileData: function() {
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: _base +"me?access_token=" + localStorageService.get('accessToken') + "&user_id=" + localStorageService.get('userId')
      }).then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    getProfilePicture: function() {
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: _base + "me/picture?access_token=" + localStorageService.get('accessToken') + "&user_id=" + localStorageService.get('userId') + "&redirect=false"
      }).then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    getProfileAlbum: function() {
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: _base + "me/albums?access_token=" + localStorageService.get('accessToken') + "&user_id=" + localStorageService.get('userId')
      }).then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    getEveryPhoto: function(url) {
      var deferred = $q.defer();
      if (url) {
        $http({
          method: "GET",
          url: url
        }).then(function(response) {
          deferred.resolve(response);
        });
      } else {
        $http({
          method: "GET",
          url: _base + "me/photos/uploaded?access_token=" + localStorageService.get('accessToken')
          }).then(function(response) {
          deferred.resolve(response);
        });
      }
      return deferred.promise;
    },
    publishPhoto: function(url) {
      var deferred = $q.defer();
      $http({
        method: "POST",
        url: _base + localStorageService.get('userId') +"/feed?link=" + url + "&access_token=" + localStorageService.get('accessToken')
      }).then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    getPageId: function() {
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: _base + localStorageService.get('userId') + "/feed?access_token=" + localStorageService.get('accessToken')
      }).then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    nextPage: null,
    prevPage: null
  };
  return main;
});