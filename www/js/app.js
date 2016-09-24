// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

/*.value('UsuarioLogueado', {
  UsuarioLog:null
})
.value('Loged', {
  log:null
})*/

.run(function($ionicPlatform) {
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

    //CARGAR AUDIOS
    if( window.plugins && window.plugins.NativeAudio ) {
      window.plugins.NativeAudio.preloadSimple( 'genji', 'audio/genji.mp3', function(msg){
      }, function(msg){
          console.log( 'succes error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'phara', 'audio/phara.mp3', function(msg){
      }, function(msg){
          console.log( 'fail error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( '76', 'audio/76.mp3', function(msg){
      }, function(msg){
          console.log( 'fail error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'hanzo', 'audio/hanzo.mp3', function(msg){
      }, function(msg){
          console.log( 'fail error: ' + msg );
      });
      window.plugins.NativeAudio.preloadSimple( 'widow', 'audio/widow.mp3', function(msg){
      }, function(msg){
          console.log( 'fail error: ' + msg );
      });
    }
  });


})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
          controller: 'MovCtrl'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
          controller: 'Login'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'CargarTrivia'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
