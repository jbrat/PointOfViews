angular.module("PoV")
.controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation) {


  $scope.initialize = function() {

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
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: lat, lng: long}
      });
    console.log(position.lat + " "+position.long);
    //map.setMyLocalionEnabled(true);
    });


  }
 });
