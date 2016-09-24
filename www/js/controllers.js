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


.controller('MovCtrl', function($scope, $cordovaFile, $cordovaDeviceMotion, $timeout) {
  //CARGAR AUDIOS DE USUARIO SI EXISTEN


  //MOVIMIENTO
  $scope.estado = "acostado";

  $scope.x;
  $scope.y;
  $scope.z;
  $scope.timestamp;
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
            }else if(result.x > 5){
              $scope.estado = "izquierda";
            }else if(result.x < -5){
              $scope.estado = "derecha";
            }else if(result.y > 8){
              $scope.estado = "parado";
            }else if(result.z < -9){
              $scope.estado = "boca abajo";
            }
          })
        });
      });
  });
    /*
    //SONIDO Y VIBRACION
    try{
      window.plugins.NativeAudio.play(sonido);
    }catch(e){
      console.log("Error Sonido " + sonido);
    }
    try{
      $cordovaVibration.vibrate(100);
    } catch(e){
      console.log("Error vibrar");
    }*/
    //GUARDAR ARCHIVO

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
