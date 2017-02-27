/**
 * Created by julien on 19/01/17.
 */

angular.module("PoV")
  .controller('SearchFormCtrl', function($scope, $state) {

    $scope.search = {
      word: ''
    };

    $scope.searchInformations = function() {
      if($scope.search.word == '') {
        $scope.errorMessage = "You need to enter a value";
      } else {
        $state.go('menu.search', {textSearch: $scope.search.word});
      }
    }

  });
