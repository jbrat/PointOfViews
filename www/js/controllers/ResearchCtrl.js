/**
 * Created by kevin on 23/01/17.
 */

angular.module("PoV")
  .controller('ResearchCtrl', function($scope) {
    $scope.search = {
      departure: '',
      arrival: '',
      time: '',
      clear: '',
      distance : ''
    };

    $scope.research = function() {

      /*Variable pour le click a false si non click ou true pour click */
      console.log($scope.search.clear);

      /* Si case cocher alors arrival = departure circuit fermer */
      if($scope.search.clear == true){
      $scope.search.arrival = $scope.search.departure;
      console.log($scope.search.departure);
      console.log($scope.search.arrival);
      console.log($scope.search.time);
      console.log($scope.search.distance);
      }

      /* Si case non cocher circuit ouvert arrival != departure */
      if($scope.search.clear == false){
      console.log($scope.search.departure);
      console.log($scope.search.arrival);
      console.log($scope.search.time);
      console.log($scope.search.distance);
      }

    }
    $scope.geolocCity = function() {
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        console.log(position);
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;

                        $http({method: 'GET', url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true'}).
                        success(function(data, status, headers, config) {
                            var ville = '';
                            var pays = '';
                            var compteur = 0;

                            console.log(data);
                            angular.forEach(data.results[0].address_components, function(object) {
                                if(compteur==2){
                                    ville = object.long_name;
                                }
                                if(compteur==5){
                                    pays = object.long_name;
                                }
                                compteur = compteur + 1;
                            });
                            $scope.search.depart = ville+","+pays;

                        }).
                        error(function(data, status, headers, config) {
                            alert("Une erreur est survenue lors de la tentative de géolocalisation")
                        });

                    }, function(err) {
                        alert("Erreur lors de la récupération de votre position actuelle");
                    });

            };

            //--------------- Geolocalisation City start -------------------------//
            $scope.geolocCity = function() {
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;

                        $http({method: 'GET', url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true'}).
                        success(function(data, status, headers, config) {
                            var ville = '';
                            var pays = '';
                            var compteur = 0;

                            console.log(data);
                            angular.forEach(data.results[0].address_components, function(object) {
                                if(compteur==2){
                                    ville = object.long_name;
                                }
                                if(compteur==5){
                                    pays = object.long_name;
                                }
                                compteur = compteur + 1;
                            });
                            $scope.search.depart = ville+","+pays;

                        }).
                        error(function(data, status, headers, config) {
                            alert("Une erreur est survenue lors de la tentative de géolocalisation")
                        });

                    }, function(err) {
                        alert("Erreur lors de la récupération de votre position actuelle");
                    });
            };

  });
