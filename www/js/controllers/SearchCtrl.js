/**
 * Created by julien on 19/01/17.
 */

angular.module("PoV")
  .controller('SearchCtrl', function($scope) {
    $scope.search = {
      word: ''
    };

    $scope.searchInformations = function() {
      console.log($scope.search.word);
    }

  });
