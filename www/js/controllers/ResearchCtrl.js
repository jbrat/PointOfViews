angular.module("PoV")
  .controller('ResearchCtrl', function($scope, $state, $cordovaGeolocation, $http, GoogleAPIKey) {
    $scope.showResearhForm = true;

    $scope.search = {
      departure: '',
      arrival: '',
      time: '',
      clear: '',
      distance: '',
      checkedCar: '',
      checkedBus: '',
      checkedWalk: '',
      checkedBike: '',
      transport: 'driving'
    };

    $scope.pov = {
      airports : true,
      amusement_park : true,
      art_gallery : true,
      bank : true,
      bakery : true,
      bar : true,
      bicycle_store : true,
      book_store : true,
      cafe : true,
      casino : true,
      clothing_store : true,
      establishement : true,
      food : true,
      gym : true,
      hospital : true,
      jewelry_story : true,
      library : true,
      musuem : true,
      pharmacy : true,
      restaurant : true,
      shoe_store : true,
      shopping_mall : true,
      store : true
    };

    $scope.research = function() {

      $scope.showResearhForm = false;

      if ($scope.search.clear) {
        $scope.search.arrival = null;
      }

      if ($scope.search.arrival != null) {
        $http(
          {
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/directions/json?origin=' + $scope.search.departure + '&destination=' + $scope.search.arrival + '&mode=' + $scope.search.transport + '&key=' + GoogleAPIKey
          })
          .success(function (datas) {
            console.log(datas);

          })
          .error(function (error) {
            $scope.errorMessage = "Cannot defined the itinerary, please try again in a moment..";
          });

      } else {

        if($scope.search.distance == null) {
          $scope.search.distance = 10000;
        }

        $http({
          method: 'GET',
          url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.search.departure
        })
        .success(function (datas) {
          var lat = datas.results[0].geometry.location.lat;
          var lng = datas.results[0].geometry.location.lng;

          var position = new google.maps.LatLng(lat, lng);

          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: position
          });

          var request = {
            location: position,
            radius: $scope.search.distance,
            types: ['store']
          };

          var infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);

          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                var place = results[i];
                createMarker(results[i]);
              }
            }
          }

          function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
          }

        })
        .error(function (error) {
          $scope.errorMessage = "It's impossible to find a correct localisation for your actual position";
        })
      }
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
            $scope.search.departure = data.results[0].formatted_address;
          })
          .error(function(error) {
            $scope.errorMessage = "Une erreur est survenue lors de la tentative de géolocalisation";
          });
        }, function(err) {
          $scope.errorMessage = "Erreur lors de la récupération de votre position actuelle";
        });

      $state.go($state.current, {}, {reload: true});
    }

    $scope.setTransport = function(type) {
     $scope.search.transport = type;
    }
  });
