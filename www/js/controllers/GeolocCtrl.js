/**
 * Created by julien on 19/01/17.
 */

angular.module("PoV")
  .controller('GeolocCtrl', function($scope, $state, $cordovaGeolocation, $ionicHistory) {

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;

        position = {
          lat: lat,
          long: long,
          error: null
        }
        
        $scope.position = position;

      }, function(err) {
        position = {
          lat: null,
          long: null,
          error: err
        };

        $scope.position = position;
      });



  });
