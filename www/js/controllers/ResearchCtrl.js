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

  });
