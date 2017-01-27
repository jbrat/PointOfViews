angular.module("PoV")
.controller('MapCtrl', function($scope, $ionicLoading) {

  $scope.initialize = function() {
    var options = {timeout: 5000, enableHighAccuracy: true}; //Demande d'autorisation d'activitaion de la géolocalisation

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 45.7772220, lng: 3.0870250}
    });
  }
 });
