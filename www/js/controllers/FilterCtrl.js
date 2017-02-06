/**
 * Created by Arslen on 30/01/17.
 */



angular.module("PoV")
  .controller('FilterCtrl', function($scope) {
    $scope.filters = [
      {name: "Cinemas"},
      {name: "Monuments"},
      {name: "Operas"},
      {name: "Museums"},
      {name: "Art galleries"},
      {name: "Bars"},
      {name: "Cafes"},
      {name: "City halls"},
      {name: "Churches"},
      {name: "Mosques"},
      {name: "Synagogues"},
      {name: "Parks"}
    ];

    $scope.filter = function() {

    }

    $scope.allfilters = {};
    $scope.allfilters.checked = false;
    $scope.checkAll = function() {
      if ($scope.allfilters.checked) {
        $scope.allfilters.checked = true;
      } else {
        $scope.allfilters.checked = false;
      }
      for (var i=0; i < $scope.filters.length; i++) {
        $scope.filters[i].checked = $scope.allfilters.checked;
      };
    };

  });
