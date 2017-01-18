/**
 * Created by julien on 16/01/17.
 */
angular.module('PoV')
  .controller('RegisterCtrl', function($scope, $state, $ionicHistory, user, FirebaseInstance) {

    $scope.register = function() {
      var email = $scope.user.email;
      var password = $scope.user.password;
      var passwordRepeat = $scope.user.passwordRepeat;

      if (password != passwordRepeat) {
        $scope.user.email = email;
        $scope.errorMessage = "The two password don't match";

        $state.go($state.current, {}, {reload: true});

      } else {

        FirebaseInstance.auth().createUserWithEmailAndPassword(email, password)
          .then(function (newUser) {
            user.uid = newUser.uid;
            user.email = email;
          }
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
              $scope.errorMessage = "The password need to be compose of 6 characters";
            } else {
              $scope.errorMessage = errorMessage;
            }
            $state.go($state.current, {}, {reload: true});
          }));
      }
    };
  });
