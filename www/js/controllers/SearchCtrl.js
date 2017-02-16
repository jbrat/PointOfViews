angular.module('PoV')
.controller('SearchCtrl', function($scope, $http, $stateParams, $state) {

  $scope.showError = true;
  $scope.parseResult = [];
  $http.get(
    "https://api.foursquare.com/v2/venues/explore/?near=" +
    $stateParams.textSearch +
    "&venuePhotos=1&section=food,shops,outdoors" +
    "&client_id=" + "HIVPXSYJDK1FLFSSJHCREMFOO34OAFQPGRIWT42EFMLQXW03" +
    "&client_secret=" + "W3P4YQZKFSCUFKUOFAVJFF0XMD1AXTCFUG0UFOQGCNPFMHF1" +
    " &v=20131124"
  )
    .success(function (data) {

      $scope.parseResult = parseResult4Square(angular.fromJson(data));

      var request = {
        query: $stateParams.textSearch
      }
      var service = new google.maps.places.PlacesService(document.createElement('div'));

      service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var resultGPlacesPlaceID = results[0].place_id;

          var request2 = {
            placeId: resultGPlacesPlaceID,
            language: 'en'
          };
          service.getDetails(request2, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              $scope.parseResult['openingHours'] = place.opening_hours.weekday_text;
              var photos = [];
              photos[0] = place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 200});

              for (var i = 1; i <= 4; i++) {
                photos.push(place.photos[i].getUrl({'maxWidth': 150, 'maxHeight': 150}));
              }
              $scope.parseResult['photos'] = photos;
              $scope.parseResult['ratingGPlaces'] = place.rating;
              $scope.parseResult['reviews'] = [];
              angular.forEach(place.reviews, function (review) {
                if (review.profile_photo_url) {
                  $scope.parseResult['reviews'].push(review);
                }
              });
              $scope.showError = false;
              $state.go($state.current, {}, {reload: true});
            } else {
              $scope.showError = true;
              $scope.errorMessage = "Can't load any places for this research in google places";
            }
          })
        } else {
          $scope.showError = true;
          $scope.errorMessage = "Can't load any places for this research";
        }
      });
    }).error(function (data) {
    $scope.showError = true;
    $scope.errorMessage = "Can't load any places for this research";
  });


  /**
   * Parsing result from FourSquare API
   *
   * @param result
   *
   * @returns {Array} parsingResult
   */
  function parseResult4Square(result) {

    var result4SquareCoord = [];
    var result4SquareContact = [];
    var result4Square = [];
    //Name
    result4Square['name'] = result.response.groups[0].items[0].venue.name;

    // GPS coordinates
    result4SquareCoord['lat'] = result.response.geocode.center.lat;
    result4SquareCoord['lng'] = result.response.geocode.center.lng;
    result4Square['coord'] = result4SquareCoord;

    // Contact
    result4SquareContact['phone'] = (result.response.groups[0].items[0].venue.contact.phone ) ? result.response.groups[0].items[0].venue.contact.phone : null;

    result4SquareContact['twitter'] = (result.response.groups[0].items[0].venue.contact.twitter) ? result.response.groups[0].items[0].venue.contact.twitter : null;
    result4SquareContact['instagram'] = (result.response.groups[0].items[0].venue.contact.instagram) ? result.response.groups[0].items[0].venue.contact.instagram : null;
    result4SquareContact['facebook'] = (result.response.groups[0].items[0].venue.contact.facebookUsername) ? result.response.groups[0].items[0].venue.contact.facebookUsername : null;
    result4Square['contact'] = result4SquareContact;

    //Location
    result4Square['location'] = result.response.groups[0].items[0].venue.location.formattedAddress;

    //URL
    result4Square['url'] = (result.response.groups[0].items[0].venue.url) ? result.response.groups[0].items[0].venue.url : null;

    //Rating
    result4Square['rating'] = (result.response.groups[0].items[0].venue.rating) ? result.response.groups[0].items[0].venue.rating : null;

    //Categories
    result4Square['categorie'] = result.response.groups[0].items[0].venue.categories[0].name;

    return result4Square;
  }


});
