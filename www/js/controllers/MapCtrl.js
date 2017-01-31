angular.module("PoV")
.controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation) {


  $scope.initialize = function() {

    var posOptions = {timeout: 5000, enableHighAccuracy: true,  maximumAge:0};
    $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(position => {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            /*position = {
                    lat: lat,
                    long: long,
                    error: null
            }*/

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: latLng
            });
            //map.setCenter(latLng);
            console.log(position.coords.latitude + " "+position.coords.longitude);
            var marker = new google.maps.Marker({
                        position:latLng,
                        title:'Location',
                        animation: google.maps.Animation.DROP,
                        dragable:true
                    });
            marker.setMap(map);
          });


  }
 });
