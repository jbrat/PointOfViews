angular.module("PoV")
  .controller('ResearchCtrl', function($scope, $cordovaGeolocation) {
    $scope.showResearhForm = true;

    $scope.search = {
      departure: '',
      arrival: '',
      time: '',
      clear: '',
      distance: '',
      transport: ''
    };

    $scope.research = function() {
      $scope.showResearhForm = false;

      if($scope.search.clear) {
        $scope.search.arrival = $scope.search.departure;
      }

      $http('http://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.departure + '&sensor=true')
        .success(function(datas) {

          var lat = datas[0].geometry.location.lat;
          var long = datas[0].geometry.location.lng;





        })
        .error(function(error){

        });

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 45.7772220, lng: 3.0870250}
      });



    }

    $scope.geolocCity = function() {

      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
      };

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;

          $http(
            {
              method: 'GET',
              url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +','+ long +'&sensor=true'
            }
          )
          .success(function(data) {
            $scope.search.depart = data[0].formatted_address;
          })
          .error(function(error) {
            $scope.errorMessage = "Une erreur est survenue lors de la tentative de géolocalisation";
          });
        }, function(err) {
          $scope.errorMessage = "Erreur lors de la récupération de votre position actuelle";
        });
    };

    $scope.setTransport = function() {

    }
  });
