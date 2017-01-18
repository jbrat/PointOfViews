/**
 * Created by julien on 16/01/17.
 */
angular.module("PoV")
  .controller('LoginCtrl', function($scope, $state, $ionicHistory, FirebaseInstance, user) {

    $scope.user = {
      email: "",
      password : ""
    };

    $scope.submitLogin = function() {
      FirebaseInstance.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
        .then(function(userConnected) {
          user.userConnected = userConnected;
          user.isLogin = true;

          $ionicHistory.clearCache().then(function() {
            //now you can clear history or goto another state if you need
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
            $state.go('app.home', {reload: true});

          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            $scope.errorMessage = "Password invalid";
          } else if(errorCode == 'auth/user-disabled') {
            $scope.errorMessage = "Your account have been disable";
          } else if(errorCode == 'auth/user-not-found') {
            $scope.errorMessage = "Your account isn't exist";
          } else {
            $scope.errorMessage = errorMessage;
          }

          $state.go($state.current, {}, {reload: true});
        });
    }

    $scope.forgotPassword = function() {
      $state.go('app.forgotPassword');
    }

    $scope.submitNewPassword = function() {

      FirebaseInstance.auth().sendPasswordResetEmail($scope.user.email)
        .then(function() {
          $scope.errorMessage = "An email have been send to reset your password";
          $state.go($state.current, {}, {reload: true});
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMesssage = error.message;

          if(errorCode == 'auth/user-not-found') {
            $scope.errorMessage = "Your account haven't be found";
          }
          if(errorCode == 'auth/auth/invalid-email') {
            $scope.errorMessage = "The email isn't valid";
          }
          $state.go($state.current, {}, {reload: true});
        });
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
        console.log(user.userConnected);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMesssage = error.message;
        console.log(errorCode+errorMesssage);
      });
    }

  });
