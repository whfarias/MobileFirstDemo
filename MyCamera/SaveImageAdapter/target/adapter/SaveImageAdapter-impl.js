/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2016. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * @param tag: a topic such as MobileFirst_Platform, Bluemix, Cordova.
 * @returns json list of items.
 */


var DATABASE_NAME = 'imagens';


function addEntry(ImageDOC) {
	var input = {
             method : 'post',
             returnedContentType : 'json',
             path : DATABASE_NAME + '/',
             body: {
                 contentType : 'application/json',
                 content :  ImageDOC
             },
						 headers: {"Accept":"application\/json"}
         };

 		 WL.Logger.error(JSON.stringify(ImageDOC));
		 WL.Logger.error(JSON.stringify(input));

	 var response = MFP.Server.invokeHttp(input);

	 	if (!response.id){
					response.isSuccessful = false;
		}

	 return ImageDOC;
}

function getDocs(){
	var path = DATABASE_NAME + '/_all_docs?include_docs=true'
	var input = {
					 method : 'get',
					 returnedContentType : 'json',
					 path : path
			 };
   WL.Logger.error(JSON.stringify(input));

	 var response = MFP.Server.invokeHttp(input);
	 WL.Logger.error(JSON.stringify(response));



	//  if (response.isSuccessful){
	// 	 path = DATABASE_NAME + response.rows[0] + 'imagem'
	// 	 var option ={
	// 		 method : 'get',
	// 		 returnedContentType : 'json',
	// 		 path : path
	// 	 }
	// 	 response = MFP.Server.invokeHttp(input);
	//  }
	 //
	 return response;

}
