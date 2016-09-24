angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //TRAER USUARIOS
    $scope.usuarios = [];
    var messagesRef = new Firebase('https://mifirebase-2c106.firebaseio.com/trivia/usuarios/');
    messagesRef.on('value', function (snapshot) { 
      var message = snapshot.val();
      for(var index in message) { 
         if (message.hasOwnProperty(index)) {
             var attr = message[index];
             $scope.usuarios.push(attr);
         }
      }
    });
})

.controller('Login', function($scope, $rootScope) {
  $scope.doLogin = function() {
    var usu = document.getElementById("usuario").value.toLowerCase();
    console.log(usu);
    $scope.loged = 0;
    $scope.usuarios.forEach(function(item, index) {
      console.log(item);
      if(item.nombre == usu && $scope.loged == 0){
        $scope.loged = 1;
      }
    });
    if($scope.loged == 1){
      $scope.logusu = usu;
      document.getElementById("LogedUsu").className = "card";
      document.getElementById("LogedUsu").innerHTML  = "<center><h4>Usuario Actual: " + usu + "</h4></center>";
      $rootScope.Loged = 1;
      $rootScope.LogedUsu = usu;
      console.log($rootScope);
    }else{
      alert("Usuario incorrecto. Intente otra vez");
    }
  };
})

.controller('CargarTrivia', function($scope) {
  
})


.controller('MovCtrl', function($scope, $rootScope, $cordovaFile, $cordovaDeviceMotion, $timeout) {
  //CARGAR AUDIOS DE USUARIO SI EXISTEN
  $rootScope.paradoFlag = "";
  $rootScope.abajoFlag = "";
  $rootScope.izqFlag = "";
  $rootScope.derFlag = "";
  $rootScope.acostadoFlag = "";

  $scope.user = function(){
    if($rootScope.paradoFlag == 1){
      alert("Sonido usuario");
      window.plugins.NativeAudio.preloadSimple( 'parado1', "userAudio/" + $rootScope.paradoPath, function(msg){
      }, function(msg){
          alert( 'fail sound preload error: ' + msg );
      });
    }
    if($rootScope.abajoFlag == 1){
      alert("Sonido usuario");
      window.plugins.NativeAudio.preloadSimple( 'boca_abajo1', $rootScope.abajoPath, function(msg){
      }, function(msg){
          alert( 'fail sound preload error: ' + msg );
      });
    }
    if($rootScope.izqFlag == 1){
      alert("Sonido usuario");
      window.plugins.NativeAudio.preloadSimple( 'izquierda1', $rootScope.izqPath, function(msg){
      }, function(msg){
          alert( 'fail sound preload error: ' + msg );
      });
    }
    if($rootScope.derFlag == 1){
      alert("Sonido usuario");
      window.plugins.NativeAudio.preloadSimple( 'derecha1', $rootScope.derPath, function(msg){
      }, function(msg){
          alert( 'fail sound preload error: ' + msg );
      });
    }
    if($rootScope.acostadoFlag == 1){
      alert("Sonido usuario");
      window.plugins.NativeAudio.preloadSimple( 'acostado1', $rootScope.acostadoPath, function(msg){
      }, function(msg){
          alert( 'fail sound preload error: ' + msg );
      });
    }
  }
  $scope.default = function(){
    $rootScope.paradoFlag = "";
    $rootScope.abajoFlag = "";
    $rootScope.izqFlag = "";
    $rootScope.derFlag = "";
    $rootScope.acostadoFlag = "";
  }

  //MOVIMIENTO
  $scope.estado = "acostado";

  $scope.x;
  $scope.y;
  $scope.z;
  $scope.timestamp;

  var oldState = "acostado";

  var options = { frequency: 1 };
  document.addEventListener("deviceready", function () {
    var watch = $cordovaDeviceMotion.watchAcceleration(options);
    watch.then(
      null,
      function(error) {
      // An error occurred
      alert(error);
      },
      function(result) {
        $timeout(function(){
          $scope.$apply(function(){
            $scope.x = result.x;
            $scope.y = result.y;
            $scope.z = result.z;
            $scope.timestamp = result.timestamp;

            if(result.x > 0 && result.x < 1 && result.y > 0 && result.y < 1 && result.z > 0){
              $scope.estado = "acostado";
              document.getElementById("imagen").src = "img/acostado.png";
            }else if(result.x > 5){
              $scope.estado = "izquierda";
              document.getElementById("imagen").src = "img/izquierda.png";
            }else if(result.x < -5){
              $scope.estado = "derecha";
              document.getElementById("imagen").src = "img/derecha.png";
            }else if(result.y > 8){
              $scope.estado = "parado";
              document.getElementById("imagen").src = "img/parado.png";
            }else if(result.z < -9){
              $scope.estado = "boca_abajo";
              document.getElementById("imagen").src = "img/boca_abajo.png";
            }

            if($scope.estado != oldState){
              //SONIDO Y VIBRACION
              try{
                switch($scope.estado){
                  case "acostado":
                    $scope.estado += $rootScope.acostadoFlag;
                    break;
                  case "parado":
                    $scope.estado += $rootScope.paradoFlag;
                    break;
                  case "izquierda":
                    $scope.estado += $rootScope.izqFlag;
                    break;
                  case "derecha":
                    $scope.estado += $rootScope.derFlag;
                    break;
                  case "boca_abajo":
                    $scope.estado += $rootScope.abajoFlag;
                    break;
                }
                window.plugins.NativeAudio.play($scope.estado);
              }catch(e){
                console.log("Error Sonido " + $scope.estado);
              }
              try{
                $cordovaVibration.vibrate(100);
              } catch(e){
                console.log("Error vibrar");
              }
              oldState = $scope.estado
            }
          })
        });
      });
  });
})

.controller('PlaylistsCtrl', function($scope, $rootScope, $cordovaCapture) {
  $scope.parado = function() {
    var options = { limit: 1, duration: 5 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
      $rootScope.paradoFlag = 1;
      $rootScope.paradoPath = audioData.fullPath;
      alert(JSON.stringify(audioData));
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
  $scope.acostado = function() {
    var options = { limit: 1, duration: 5 };
    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
      $rootScope.acostadoFlag = 1;
      $rootScope.acostadoPath = audioData.fullPath;
      alert(JSON.stringify(audioData));
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
  $scope.izquierda = function() {
    var options = { limit: 1, duration: 5 };
    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
      $rootScope.izqFlag = 1;
      $rootScope.izqPath = audioData.fullPath;
      alert(JSON.stringify(audioData));
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
  $scope.derecha = function() {
    var options = { limit: 1, duration: 5 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
      $rootScope.derFlag = 1;
      $rootScope.derPath = audioData.fullPath;
      //audioData.Move("userAudio/");
      //audioData.MoveFile(audioData.fullPath, /*"userAudio/" + audioData.name*/ "file:/storage/emulated/0/PSP/" + audioData.name);

      alert(JSON.stringify(audioData));
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
  $scope.abajo = function() {
    var options = { limit: 1, duration: 5 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
      $rootScope.abajoFlag = 1;
      $rootScope.abajoPath = audioData.fullPath;
      alert(JSON.stringify(audioData));
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
});
