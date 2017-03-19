angular.module('PoV.controllers', [])

  .controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, $ionicHistory, user, FirebaseInstance) {

    $scope.user = user;

    $scope.options = {
      loop: true,
      speed: 500,
    }

    $scope.disconnect = function() {

      FirebaseInstance.auth().signOut().then(function(error) {
        user.isLogin = false;
        user.email = "";

        $ionicHistory.clearCache().then(function(user) {
          //now you can clear history or goto another state if you need
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });

          $state.go('app', {reload: true});
        })
      });
    }
    $scope.user = {
      email: "",
      password : ""
    };

    $scope.forgotPassword = function() {
      $state.go("forgotPassword", {reload:true});
    }

    $scope.facebookAuth = function() {

      // Sign in using a popup.
      var provider = new FirebaseInstance.auth.FacebookAuthProvider();
      provider.addScope('email');
      FirebaseInstance.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user.userConnected = result.user;

        user.isLogin = true;

        $ionicHistory.clearCache().then(function() {
          //now you can clear history or goto another state if you need
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });

          $state.go('menu.home', {reload: true});
        });

      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMesssage = error.message;

        if(errorCode == 'auth/popup-blocked') {
          $scope.errorMessage = "Your smartphone block the facebook popup authentification";
        } else if(errorCode == 'auth/popup-closed-by-user') {
          $scope.errorMessage = "You have closed the facebook connection window";
        } else if(errorCode == 'auth/operation-not-allowed') {
          $scope.errorMessage = "Your facebook account have been blocked by the administrator";
        } else if(errorCode == 'auth/cancelled-popup-request') {
          $scope.errorMessage = "Only one instance of connection facebook can be load";
        } else {
          $scope.errorMessage = errorCode;
        }
        $state.go($state.current, {}, {reload: true});
      });
    }

    $scope.gmailAuth = function()  {

      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/plus.login");

      FirebaseInstance.auth().signInWithPopup(provider).then(function (result) {

        var token = result.credential.accessToken;
        // The signed-in user info.
        user.userConnected = result.user;
        user.isLogin = true;

        $ionicHistory.clearCache().then(function() {
          //now you can clear history or goto another state if you need
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });

          $state.go('menu.home', {reload: true});
        });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMesssage = error.message;

        if(errorCode == 'auth/popup-blocked') {
          $scope.errorMessage = "Your smartphone block the google+ popup authentification";
        } else if(errorCode == 'auth/popup-closed-by-user') {
          $scope.errorMessage = "You have closed the google+ connection window";
        } else if(errorCode == 'auth/operation-not-allowed') {
          $scope.errorMessage = "Your google+ account have been blocked by the administrator";
        } else if(errorCode == 'auth/cancelled-popup-request') {
          $scope.errorMessage = "Only one instance of connection google+ can be load";
        } else {
          $scope.errorMessage = errorCode;
        }

        $state.go($state.current, {}, {reload: true});
      });
    }
  });



