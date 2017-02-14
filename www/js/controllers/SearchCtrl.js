/**
 * Created by julien on 19/01/17.
 */

angular.module("PoV")
  .controller('SearchCtrl', function($scope, $http) {
    $scope.search = {
      word: ''
    };

  $scope.printForm = true;
  var result4quare=[];

  $scope.searchInformations = function(){
  $scope.printForm = false;
      // load filter options from localStorage


      $http.get(
        "https://api.foursquare.com/v2/venues/explore/?near=" +
        $scope.search.word  +
        "&venuePhotos=1&section=food,shops,outdoors"+
        "&client_id=" + "HIVPXSYJDK1FLFSSJHCREMFOO34OAFQPGRIWT42EFMLQXW03" +
        "&client_secret=" + "W3P4YQZKFSCUFKUOFAVJFF0XMD1AXTCFUG0UFOQGCNPFMHF1" +
        " &v=20131124"
      )
      .success(function(data){

           var result4quareCoord=[];
           var result4quareContact=[];

             var result= angular.fromJson(data);
            console.log("Sucess");

            //Name
            result4quare['name']= result.response.groups[0].items[0].venue.name;
            console.log(result4quare['name']);

            // GPS coordinates
            result4quareCoord['lat']=result.response.geocode.center.lat;
            result4quareCoord['lng']=result.response.geocode.center.lng;
            result4quare['coord']= result4quareCoord;

            // Contact
            if ( result.response.groups[0].items[0].venue.contact.phone ? result4quareContact['phone']=result.response.groups[0].items[0].venue.contact.phone : null);
            if ( result.response.groups[0].items[0].venue.contact.twitter ? result4quareContact['twitter']=result.response.groups[0].items[0].venue.contact.twitter : null);
            if ( result.response.groups[0].items[0].venue.contact.instagram ? result4quareContact['instagram']=result.response.groups[0].items[0].venue.contact.instagram :  null);
            if ( result.response.groups[0].items[0].venue.contact.facebookName ? result4quareContact['facebook']= result.response.groups[0].items[0].venue.contact.facebookName : null)
            result4quare['contact']=result4quareContact;

            //Location
            result4quare['location']=result.response.groups[0].items[0].venue.location.formattedAddress;

            //URL
            if ( result.response.groups[0].items[0].venue.url ? result4quare['url']=result.response.groups[0].items[0].venue.url : null);

            //Rating
            if ( result.response.groups[0].items[0].venue.rating ? result4quare['rating']=result.response.groups[0].items[0].venue.rating : null);

            //Categories
            result4quare['categorie']=result.response.groups[0].items[0].venue.categories[0].name;

            }
       ).error(function(data) {
                     console.log("Unknown place, try again");
                    })
    };
  });
