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

            $state.go('menu.home', {reload: true});
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
            $scope.errorMessage = "Your account does not exist";
          } else {
            $scope.errorMessage = errorMessage;
          }

          $state.go($state.current, {}, {reload: true});
        });
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
          } else if(errorCode == 'auth/auth/invalid-email') {
            $scope.errorMessage = "The email does not valid";
          } else {
            $scope.errorMessage = errorCode;
          }
          $state.go($state.current, {}, {reload: true});
        });
    }

  });
