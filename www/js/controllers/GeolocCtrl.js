/**
 * Created by julien on 19/01/17.
 */
angular.module("PoV")
  .controller('GeolocCtrl', function($scope, $state, $cordovaGeolocation, $ionicHistory) {

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: position
        });

        var marker = new google.maps.Marker({
          map: map,
          position: position
        });

        $scope.showMap = true;
      }, function(err) {
        $scope.errorMessage = "An error attempt, we can't load your actual position";
        $scope.showMap = false;
      });
  });
