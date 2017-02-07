/**
 * Created by julien on 19/01/17.
 */

angular.module("PoV")
  .controller('SearchCtrl', function($scope, $http) {
    $scope.search = {
      word: ''
    };

  $scope.searchInformations = function(){

      // load filter options from localStorage
      records = JSON.parse(localStorage.getItem('records'));
      if (records == null) {
        records = {
          food: true,
          shops: false,
          outdoors: false
        };
        localStorage.setItem('records', JSON.stringify(records));
      }

      // create the category array
      var category= [];
      if (records.food) category.push('food');
      if (records.shops) category.push('shops');
      if (records.outdoors) category.push('outdoors');

      $http.get(
        "https://api.foursquare.com/v2/venues/explore/?near=" +
        $scope.search.word  +
        "&venuePhotos=1&section=" +
        category.join(',') +
        "&client_id=" + "HIVPXSYJDK1FLFSSJHCREMFOO34OAFQPGRIWT42EFMLQXW03" +
        "&client_secret=" + "W3P4YQZKFSCUFKUOFAVJFF0XMD1AXTCFUG0UFOQGCNPFMHF1" +
        " &v=20131124"
      )
      .success(function(data){
                    console.log("Sucess");
                    console.log(data);
                    }
       ).error(function(data) {
                     console.log("Error");
                    })
    };
  });
