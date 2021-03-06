/**
 *
 */
angular.module('PoV.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      templateUrl: 'templates/mainLogin.html',//menu
      controller: 'AppCtrl'
    })

    //app
    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MenuCtrl'
    })

    .state('menu.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('login',{
      url:'/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('register',{
      url:'/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })

    .state('forgotPassword', {
      url: '/forgotPassword',
      templateUrl: 'templates/forgotPassword.html',
      controller: 'LoginCtrl'
    })

    .state('menu.profil', {
      url: '/profil',
      views: {
        'menuContent': {
          templateUrl: 'templates/profil.html',
          controller: 'ProfilCtrl'
        }
      }
    })

    .state('menu.searchForm', {
      url: '/searchForm',
      views: {
        'menuContent': {
          templateUrl: 'templates/searchForm.html',
          controller: 'SearchFormCtrl'
        }
      }
    })

    .state('menu.search', {
          url: '/search/:textSearch',
        views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })

    .state('menu.research', {
          url: '/research',
          views: {
            'menuContent': {
              templateUrl: 'templates/research.html',
              controller: 'ResearchCtrl'
            }
          }
    })
    .state('menu.geoloc', {
      url: '/geoloc',
      views: {
        'menuContent': {
          templateUrl: 'templates/geoloc.html',
          controller: 'GeolocCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});
