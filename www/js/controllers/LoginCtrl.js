/**
 * Created by julien on 16/01/17.
 */
angular.module("PoV")
  .controller('LoginCtrl', function($scope, $state, FirebaseInstance) {

    $scope.doLogin = function() {
      FirebaseInstance.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            $scope.errorMessage = "Password invalid";
          } else if(errorCode == 'auth/user-disabled') {
            $scope.errorMessage = "Your account have been disable";
          } else if(errorCode == 'auth/user-not-found') {
            $scope.errorMessage = "Your account isn't exist";
          }
          else {
            $scope.errorMessage = errorMessage);
          }

          $state.go($state.current, {}, {reload: true});
        });
    }

    $scope.facebookAuth = function() {

    }

    $scope.forgotPassword = function() {
      $state.go('app.forgotPassword')
    }

    $scope.submitNewPassword = function() {

    }
  });
