angular.module("PoV")
  .controller('ResearchCtrl', function($scope, $state, $cordovaGeolocation, $http, $q, GoogleAPIKey) {
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


    $scope.typePlaces = [
      {
        categorieId: 'divertisment',
        categorieName: 'Divertisment',
        showCategorie: false,
        listTypes: [
          {
            gName: 'amusement_park',
            printName: 'Amusement park',
            status: true
          },
          {
            gName: 'art_gallery',
            printName: 'Art gallery',
            status: true
          },
          {
            gName: 'casino',
            printName: 'Casino',
            status: true
          },
          {
            gName: 'library',
            printName: 'Library',
            status: true
          },
          {
            gName: 'museum',
            printName: 'Museum',
            status: true
          },
        ]
      },
      {
        categorieId: 'food_establishement',
        categorieName: 'Food establishement',
        showCategorie: false,
        listTypes: [
          {
            gName: 'bakery',
            printName: 'Bakery',
            status: true
          },
          {
            gName: 'bar',
            printName: 'Bar',
            status: true
          },
          {
            gName: 'cafe',
            printName: 'Cafe',
            status: true
          },
          {
            gName: 'food',
            printName: 'Food',
            status: true
          },
          {
            gName: 'restaurant',
            printName: 'Restaurant',
            status: true
          }
        ]
      },
      {
        categorieId: 'various',
        categorieName: 'Various',
        showCategorie: false,
        listTypes: [
          {
            gName: 'airports',
            printName :'Airports',
            status: true
          },
          {
            gName: 'establishement',
            printName: 'Establishement',
            status: true
          },
          {
            gName: 'pharmacy',
            printName: 'Pharmacy',
            status: true
          },
          {
            gName: 'store',
            printName: 'Store',
            status: true
          }
        ]
      }
    ];

    $scope.research = function() {

      $scope.showResearhForm = false;

      if ($scope.search.clear || $scope.search.arrival == "") {
        $scope.search.arrival = null;
      }

      if ($scope.search.arrival != null) {

        var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

        var map = initMap(null);
        directionsDisplay.setMap(map);

        // Calculate google direction
        calculateDirection($scope.search.departure, $scope.search.arrival, $scope.search.transport, null).then(function(direction) {
            directionsDisplay.setDirections(direction);
        });

        var currentMarker = new google.maps.Marker({
          map: map,
          title: "your position",
          icon: "img/suv.png"
        });

        var watchOptions = {
          timeout : 10000,
          enableHighAccuracy: true
        };

        $cordovaGeolocation.watchPosition(watchOptions)
          .then(
            null,
            function(error) {
              alert("An error attempt when we try to get your current position");
            },
            function(position) {
              var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              currentMarker.setPosition(currentPosition);

              map.setCenter(currentPosition);

              var request = {
                location: currentPosition,
                radius: 5000,
                types: getGoogleTypesCategorieSelected()
              };

              var service = new google.maps.places.PlacesService(map);

              // PRINT ALL PLACE
              service.nearbySearch(request, function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  angular.forEach(results, function(item) {
                    createMarker(map, item);
                  });
                } else {
                  alert("An error attempt when we try to load the different places");
                }
              });
            }
          );
      } else {

        if($scope.search.distance == null || $scope.search.distance == "") {
          $scope.search.distance = 10000;
        }

        getGeolocByAddress($scope.search.departure).then(function(location) {

          var position = new google.maps.LatLng(location.lat, location.lng);

          // init map + direction renderer
          var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
          var map = initMap(position);
          directionsDisplay.setMap(map);

          var request = {
            location: position,
            radius: $scope.search.distance,
            types: getGoogleTypesCategorieSelected()
          };

          var service = new google.maps.places.PlacesService(map);

          // PRINT ALL PLACE
          service.nearbySearch(request, function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              var waypoints = [];
              var nbrMaxWayPoints = 23;
              var compteur = 1
              angular.forEach(results, function(item) {

                if(compteur < nbrMaxWayPoints) {
                  waypoints.push({
                    location: item.geometry.location,
                    stopover: true
                  });
                  createMarker(map, item);
                }
                compteur++;
              });

              calculateDirection($scope.search.departure, $scope.search.departure, $scope.search.transport, waypoints).then(function(direction) {
                directionsDisplay.setDirections(direction);
              });
            } else {
              $scope.errorMessage = "An error attempt when we try to load the different places";
              $state.go($state.current, {}, {reload: true});
            }
          });

          var currentMarker = new google.maps.Marker({
            map: map,
            title: "your position",
            icon: "img/suv.png"
          });

          var watchOptions = {
            timeout : 10000,
            enableHighAccuracy: true
          };

          $cordovaGeolocation.watchPosition(watchOptions)
            .then(
              null,
              function(error) {
                alert("An error attempt when we try to get your current position");
              },
              function(position) {
                currentMarker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
              });
        });
      }
    }

    $scope.geolocCity = function(point) {
      console.log(point);
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
      };

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude;
          var lng = position.coords.longitude;

          getGeolocByLatLng(lat, lng).then(function(Adress) {
            if (point == "departure") {
              $scope.search.departure = Adress;
            } else {
              $scope.search.arrival = Adress;
            }
          });

        }, function(err) {
          $scope.errorMessage = "An error attempt when we try to get your current position";
        });

      $state.go($state.current, {}, {reload: true});
    }



    $scope.setTransport = function(type) {
     $scope.search.transport = type;
    }

    /**
     * Method to get the types which are currently selected
     *
     * @return Array of strings google types
     */
    function getGoogleTypesCategorieSelected() {

      var typesSelected = [];

      angular.forEach($scope.typePlaces, function(categorie) {
        angular.forEach(categorie.listTypes, function(itemType) {
          if(itemType.status) {
            typesSelected.push(itemType.gName);
          }
        });
      });
      return typesSelected;
    }

    /**
     * Method to get the current location with cordova plugin
     *
     * @return Promise Location {lat,lng}
     */
    function getCurrentLocation() {

      var defer = $q.defer();

      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
      };

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;

          defer.resolve({
            lat: lat,
            lng: long
          });

        }, function(err) {
          $scope.errorMessage = "An error attempt when we try to get your current position";
          $state.go($state.current, {}, {reload: true});
        });

      return defer.promise;
    }

    /**
     * Method to get the address promise for a lat & lng position
     * @param lat
     * @param lng
     *
     * @returns {Promise} Address
       */
    function getGeolocByLatLng(lat, lng) {
      var defer = $q.defer();
      $http(
        {
          method: 'GET',
          url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +','+ lng +'&sensor=true'
        }
      )
        .success(function(data) {
          if(data.error_message != null) {
            $scope.errorMessage = "An error attempt when we try to geoloc your location for an adress";
            $state.go($state.current, {}, {reload: true});
          }

          defer.resolve(data.results[0].formatted_address);
        })
        .error(function(error) {
          $scope.errorMessage = "An error attempt when we try to geoloc your location for an adress";
          $state.go($state.current, {}, {reload: true});
        });
      return defer.promise;
    }

    /**
     * Method to return the Location Promise for an address
     *
     * @param address
     *
     * @returns {Promise} Location
     */
    function getGeolocByAddress(address) {

      var defer = $q.defer();

      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address
      })
      .success(function (datas) {

        var lat = datas.results[0].geometry.location.lat;
        var lng = datas.results[0].geometry.location.lng;

        defer.resolve({
          lat: lat,
          lng: lng
        });
      })
      .error(function (error) {
        $scope.errorMessage = "It's impossible to find a correct localisation for your actual position";
        $state.go($state.current, {}, {reload: true});
      })

      return defer.promise;
    }

    /**
     * Function to initialise a map with a centerPosition
     *
     * @param centerPosition
     *
     * @returns {google.maps.Map}
     */
    function initMap(centerPosition) {
      if(centerPosition != null) {
        return new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: centerPosition
        });
      } else {
        return new google.maps.Map(document.getElementById('map'), {
          zoom: 7
        });
      }
    }

    /**
     * Function to create a marker in the map
     *
     * @param map
     * @param place
     *
     */
    function createMarker(map, place) {

      var infowindow = new google.maps.InfoWindow();
      var placeLoc = place.geometry.location;

      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function () {
        var content = "<p>"+ place.name + "</p>" + "<a href='#/app/search/"+place.name+"'>More infos+</a>";
        infowindow.setContent(content);
        infowindow.open(map, this);
      });
    }

    /**
     * Function to return the google TravelMode for our form transport
     *
     * @param searchTransport
     *
     * @returns {*}
     */
    function getGoogleTravelMode(searchTransport) {

      if(searchTransport == "bicycling") {
        return google.maps.TravelMode.BICYCLING;
      } else if(searchTransport == "walking") {
        return google.maps.TravelMode.WALKING;
      } else if(searchTransport == "transit") {
        return google.maps.TravelMode.TRANSIT;
      } else {
        return google.maps.TravelMode.DRIVING;
      }
    }

    /**
     * Function to calculate a direction between to point with a transport mode
     *
     * @param departure
     * @param arrival
     * @param searchTransport
     * @param waypoints (can be null)
     *
     * @return direction result
     */
    function calculateDirection(departure, arrival, searchTransport, waypoints) {

      var directionsService = new google.maps.DirectionsService();
      var request = {
        origin: departure,
        destination: arrival,
        travelMode: getGoogleTravelMode(searchTransport)
      };

      if(waypoints != null) {
        request.waypoints = waypoints;
        request.optimizeWaypoints =true;
      }

      var defer = $q.defer();
      directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          defer.resolve(result);
        } else {
          $scope.errorMessage = "Can't load the itinary between the places";
          $state.go($state.current, {}, {reload: true});
        }
      });

      return defer.promise;
    }
  });

