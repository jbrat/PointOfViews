// Ionic BlaBlaCar App

var app = angular.module('PoV', ['ionic', 'PoV.controllers', 'PoV.routes', 'firebase', 'ngAutocomplete', 'ngCordova'])
  .factory('FirebaseInstance', function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBTXtsn6OPrsws9SrRRsNevJuIf5FO0jsY",
      authDomain: "pointofviews-3f1b0.firebaseapp.com",
      databaseURL: "https://pointofviews-3f1b0.firebaseio.com",
      storageBucket: "pointofviews-3f1b0.appspot.com",
      messagingSenderId: "768228455889"
    };

    firebase.initializeApp(config);

    return firebase;
  });

app.value('user', {
  userConnected: null,
  isLogin:false
});

app.value('GoogleAPIKey', 'AIzaSyAYD8ko6MKsOkBwVTDQlD1R5CJKRP7xGnA');

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
