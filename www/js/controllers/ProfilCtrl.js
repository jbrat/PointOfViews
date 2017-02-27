/**
 * Created by julien on 18/01/17.
 */

angular.module("PoV")
  .controller('ProfilCtrl', function($scope, $state, $ionicHistory, FirebaseInstance, user) {
    $scope.user = user;

    $scope.verifyEmail = function() {

      user.userConnected.sendEmailVerification()
        .then(function(result) {
          $scope.errorMessage = "An email have been sent to your email address to verify it";
          $state.go($state.current, {}, {reload: true});
        });
    }

    $scope.updateDisplayName = function() {

      user.userConnected.updateProfile({
        displayName: $scope.user.displayName,
        photoURL: null
      }).then(function() {
        $scope.errorMessage = "The new value is " + user.userConnected.displayName;
      }).catch(function() {
        $scope.errorMessage = "error for update your name";
        $state.go($state.current, {}, {reload: true});
      })
    }


    $scope.checkHistory = function() {
        }


        $scope.checkLikes = function() {
        }


  });
