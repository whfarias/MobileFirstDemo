// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ngSanitize'])

.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
})

//Adiciona um elemento HTML como uma diretiva angular
.directive("filterBar",function(){
  return {
    restrict: "E",
    templateUrl: "components/filterbar.html"
  }
})

.run(function($ionicPlatform, MFPInit) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  if (ionic.Platform.isIOS()){
   setTimeout(function () {
      navigator.splashscreen.hide();
   }, 3000 - 1000);
 }

})

.factory('MFPInit', function($q){
    /* Setup a Promise to allow code to run in other places anytime after MFP CLient SDK is ready
       Example: MFPClientPromise.then(function(){alert('mfp is ready, go ahead and use WL.* APIs')});
    */
    return window.MFPClientDefer.promise;
  })



.controller ("CameraController", function($scope, $ionicPopup, CameraUtil){

  $scope.onTabSelect = function(){
     // Dados de navegação para o Analytics
     var event = {viewLoad: 'Camera'};
     WL.Analytics.log(event, 'Camera - loaded');
     WL.Analytics.send();

     $scope.image = {};
     $scope.image.Documento = "";
     // Nome do Documento
      $ionicPopup.show({
        title : "Nome do Documento",
        scope : $scope,
        template : "<input type='text' placeholder='Nome do Documento Digitalizado' autofocus='true' ng-model= 'image.Documento' />",
        buttons : [
          {text : "OK",
           onTap: function(e){
                 //Chamado a Camera
                  CameraUtil.getImage(CameraUtil.cameraOptions.CAMERA, function(imageData){
                  $scope.imageCamera = undefined;
                  $scope.imageCamera = "data:image/jpeg;base64," + imageData;

                  var image = {
                      "Documento" : $scope.image.Documento,
                      "_attachments":
                          {
                            "imagem":
                            {
                              "content_type":"image/jpeg;base64,",
                              "data": imageData
                            }
                          }
                  };
                  //Salvar a Imagem no Banco de Dados
                   var res = new WLResourceRequest("adapters/SaveImageAdapter/addEntry", WLResourceRequest.POST);

                    res.sendFormParameters({ "params" : "[" + JSON.stringify(image) + "]" }).then(
                     function(response){
                       alert("Documento Salvo!!!");
                   },
                    function (error){
                      alert ("Error na chamada do Adapter" + error.errorMsg);
                      //  console.log(error);
                       var event = {viewError: error};
                       WL.Analytics.log(event, 'Erro');
                       WL.Analytics.send();
                    });
                },function(err){
                  console.log(err);
                }
              );
           }},
          {text : "Cancel"}
        ]
      });
  }

})

.controller ("ProdController", function($scope,MFPInit,$q){
  // Dados de navegação para o Analytics

 // alert("ProdController");


    MFPInit.then(function(){
      var event = {viewLoad: 'Lista de Produtos'};
      WL.Analytics.log(event, 'Lista de Produtos- loaded');
      WL.Analytics.send();

       var res = new WLResourceRequest("adapters/ProductAdapter/listProducts", WLResourceRequest.GET);
       res.send().then(
       function(response){
        $scope.Prods = [];
        $scope.Prod = {};
        // resposta = response.responseJSON;
        // alert(JSON.stringify(response.responseJSON.productList));
        $scope.Prods = response.responseJSON.array;
        $scope.$apply();
     },
      function (error){
        alert ("Error na chamada do Adapter: listProducts: " + error.errorMsg);
      });
    });
})

.controller ("GaleriaController", function($scope,CameraUtil, $sce){
//Alteração para o commit
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.onTabSelect = function(){
    var event = {viewLoad: 'Galeria'};
    WL.Analytics.log(event, 'Galeria - loaded');
    WL.Analytics.send();
    // Dados de navegação para o Analytics
    var CloudantDomain = "25704a7a-f19f-4f97-b4f9-b7c6b4f20d28-bluemix.cloudant.com";
    var CloudantDatabase = "imagens";

    // Buscar imagens do Cloudant
     var res = new WLResourceRequest("adapters/SaveImageAdapter/getDocs", WLResourceRequest.GET);
      res.send().then(
       function(response){
         //$scope.nomeGallery =  response.responseJSON.rows[0].doc.Documento;
         $scope.Docs = [];
         $scope.Doc = {};
         $scope.Docs = response.responseJSON.rows;

         for (var i = 0; i < $scope.Docs.length; i++) {
              $scope.Docs[i].url = "https://dfastannimeneciedeptednt:ed51d6a2761755a6f1873a39ac57d47735c37105@" + CloudantDomain + "/" + CloudantDatabase + "/" + $scope.Docs[i].doc._id + "/imagem";
         }

         $scope.$apply();
     },
      function (error){
        alert ("Error na chamada do Adapter: getDocs: " + error.errorMsg);
      });
 }
})



var Messages = {
  // Add here your messages for the default language.
  // Generate a similar file with a language suffix containing the translated messages.
  // key1 : message1,
};

var wlInitOptions = {
  // Options to initialize with the WL.Client object.
  // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};
var notificationReceived = function(message) {
  console.log(JSON.stringify(message));
    alert(JSON.stringify(message.alert.body));
};

window.MFPClientDefer = angular.injector(['ng']).get('$q').defer();
window.wlCommonInit = window.MFPClientDefer.resolve;
window.MFPClientDefer.then(function wlCommonInit(){
  console.log('MobileFirst Client SDK Initilized');
  MFPPush.initialize (
    function(successResponse) {
        // alert("Successfully intialized");
        MFPPush.registerNotificationsCallback(notificationReceived);
    },
    function(failureResponse) {
        alert("Failed to initialize: " + failureResponse.errorMsg);
    }
  );
  var options = {"phoneNumber":""};
  MFPPush.registerDevice(
    options,
    function(successResponse) {
        // alert("Successfully registered");
    },
    function(failureResponse) {
        // alert(failureResponse.errorMsg);
        alert("Failed to register");
    }
  );

})
.fail(function(fail){
  console.log('Não foi: ' + fail);
});
