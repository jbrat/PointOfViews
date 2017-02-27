angular.module('PoV.controllers', [])

  .controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, $ionicHistory, user, FirebaseInstance) {

    $scope.user = user;


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

  });



