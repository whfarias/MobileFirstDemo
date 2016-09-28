angular. module("starter").factory("CameraUtil",function($cordovaCamera){
  var util ={};

  util.cameraOptions = {
    CAMERA : 1,
    GALLERY :  2
  }

  util.getImage = function(option, success,error){
    // alert(option);
    var options = {
         quality: 80,
         destinationType: 0,
         sourceType: option,
         allowEdit: false,
         encodingType: Camera.EncodingType.JPEG,
         targetWidth: 100,
         targetHeight: 100,
         saveToPhotoAlbum: false,
         correctOrientation:true,
       };


       $cordovaCamera.getPicture(options).then(
         function(imageData) {
          success(imageData);
         }, function(err) {
           error (err);
       });
  };
  return util;
})
