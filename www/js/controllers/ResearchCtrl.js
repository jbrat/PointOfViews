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

      if($scope.search.clear) {
        $scope.search.arrival = $scope.search.departure;
      }



    }

  });
