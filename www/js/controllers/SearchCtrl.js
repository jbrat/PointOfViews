/**
 * Created by julien on 19/01/17.
 */

angular.module("PoV")
  .controller('SearchCtrl', function($scope, $http) {
    $scope.search = {
      word: ''
    };

$scope.searchInformations = function() {

  var wolfram = require('wolfram-alpha').createClient("KU9A6E-8UYUE9ETTG", opts);

  wolfram.query($scope.search.word, function (err, result) {
    if (err) throw err;
    console.log("Result: %j", result);
  });
}


/*$scope.searchInformations = function() {
      console.log($scope.search.word);
            $http({
            method: 'JSONP',
            url: 'http://api.wolframalpha.com/v2/query?input='+ $scope.search.word + "&appid=KU9A6E-8UYUE9ETTG",
            callback: 'JSON_CALLBACK',
            format: 'jsonp'
            })
            .success(function(data){
             console.log("Sucess");
              var x2js = new X2JS();
              var jsonObj = x2js.xml2json(data);
              console.log(jsonObj);
             })
            .error(function(data) {
              console.log(data);
             })

    }*/

    /*$scope.searchInformations = function() {
      console.log($scope.search.word);
            $http.get("http://api.wolframalpha.com/v2/query?input="+
            $scope.search.word + "&appid=KU9A6E-8UYUE9ETTG")
            .success(function(data){
              console.log(data);
              })
            .error(function(data) {
              console.log(data);
              })

    }*/


  });
