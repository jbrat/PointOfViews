/**
 *
 */
angular.module('PoV.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })

    .state('app.forgotPassword', {
      url: '/forgotPassword',
      views: {
        'menuContent': {
          templateUrl: 'templates/forgotPassword.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.profil', {
      url: '/profil',
      views: {
        'menuContent': {
          templateUrl: 'templates/profil.html',
          controller: 'ProfilCtrl'
        }
      }
    })
    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('app.geoloc', {
      url: '/geoloc',
      views: {
        'menuContent': {
          templateUrl: 'templates/geoloc.html',
          controller: 'GeolocCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
