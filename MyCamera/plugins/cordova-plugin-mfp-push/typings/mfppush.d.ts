declare module MFPPush {

    /**
    * Initializes MFPPush instance. This is required for the client application to connect to MFPPush service with the right
    * application context. This API should be called first before using other MFPPush APIs.
    *
    * @param {Function} success Mandatory function. The callback function that is invoked if the initialization is successful
    * @param {Function} failure Mandatory function. The callback function that is invoked if the initialization fails  
    * @param {number} timeout Optional. An integer value, denoting the timeout (in milliseconds) for all the requests made to the Push service
	* 
	* @methodOf MFPPush#      
    */
	function initialize(success: Function, failure: Function, timeout?: number): void;
	
    /**
    * Checks whether Push Notification is supported on the device
    *
    * @param {Function} success Mandatory function. The callback function that is invoked if the call is successful
    * @param {Function} failure Mandatory function. The callback function that is invoked if the call fails  
	* 
	* @methodOf MFPPush#      
    */		
	function isPushSupported(success: Function, failure: Function): void;
	
    /**
    * Retrieves all the subscriptions of the device 
    *
    * @param {Function} success Mandatory function. The callback function that is invoked with array of subscribed tags
    * @param {Function} failure Mandatory function. The callback function that is invoked if the call fails  
	* 
	* @methodOf MFPPush#      
    */		
	function getSubscriptions(success: Function, failure: Function): void;
	
    /**
    * Retrieves all the available tags of the application
    *
    * @param {Function} success Mandatory function. The callback function that is invoked with array of tags of the application
    * @param {Function} failure Mandatory function. The callback function that is invoked if the call fails  
	* 
	* @methodOf MFPPush#      
    */	
	function getTags(success: Function, failure: Function): void;
	
    /**
    * Subscribes the device to the given tags
    *
    * @param {string[]} tags Mandatory. Array of tags
    * @param {Function} success Mandatory function. The callback function that is invoked if the subscription is successful
    * @param {Function} failure Mandatory function. The callback function that is invoked if the subscription fails  
	* 
	* @methodOf MFPPush#      
    */		
	function subscribe(tags: string[], success: Function, failure: Function): void;
	
    /**
    * Unsubscribes the device from the given tags
    *
    * @param {string[]} tags Mandatory. Array of tags
    * @param {Function} success Mandatory function. The callback function that is invoked if the unsubscription is successful
    * @param {Function} failure Mandatory function. The callback function that is invoked if the unsubscription fails 
	* 
	* @methodOf MFPPush#      
    */		
	function unsubscribe(tags: string[], success: Function, failure: Function): void;

	 /**
    * Registers the device with the push service
    *
	* @param {Object} options Mandatory.
	*        ios: { phoneNumber: String, alert: boolean, badge: boolean, sound: boolean, categories: Object[] }
	*        android: {}
	*		  
	*		  where 
	*   			phoneNumber - Phone number to receive the SMS based notifications
	*				alert - To enable displaying alert messages
	*				badge - To enable badge icons
	*				sound - To enable playing sound
	*				categories - iOS8 interactive notification categories 
	*		  for example,
	*			{
	*				ios: {
	*					phoneNumber: "999999999",
	*					alert: true,
	*					badge: true,
	*					sound: true,	 
	*		  			categories: [{
	*							//Category identifier, this is used while sending the notification.
	*							id : "poll", 
	*							//Optional array of actions to show the action buttons along with the message.	
	*							actions: [
	*								 {
	*    								//Action identifier
	*   								 id : "poll_ok", 
    *  
	*   								//Action title to be displayed as part of the notification button.
	*    								title : "OK", 
	*			
	*									//Optional mode to run the action in foreground or background. 1-foreground. 0-background. Default is foreground.
	*			   						 mode: 1,  
	*  
	*    								//Optional property to mark the action button in red color. Default is false.
	*    								destructive: false,
	*  
	*    								//Optional property to set if authentication is required or not before running the action.(Screen lock).
	*    								//For foreground, this property is always true.
	*    								authenticationRequired: true
	*  							},
    *  							{
	*    								id : "poll_nok",
	*  								title : "NOK",
	*   								mode: 1,
	*   								destructive: false,
	*   								authenticationRequired: true
	*  							}	
	*							],
	*    						//Optional list of actions that is needed to show in the case alert. 
	*    						//If it is not specified, then the first four actions will be shown.
	*    						defaultContextActions: ['poll_ok','poll_nok'],
	*    
	*    						//Optional list of actions that is needed to show in the notification center, lock screen. 
	*    						//If it is not specified, then the first two actions will be shown.
	*    						minimalContextActions: ['poll_ok','poll_nok'] 
  	*					}] 	
  	*				},
  	*				android: {
  	*					phoneNumber: "999999999"
  	*				}
  	*			}	
  	*	   
    * @param {Function} success Mandatory function. The callback function that is invoked if the registration is successful
    * @param {Function} failure Mandatory function. The callback function that is invoked if the registration fails 
	* 
	* @methodOf MFPPush#      
    */	
	function registerDevice(options: Object, success: Function, failure: Function): void;
	
    /**
    * Unregisters the device from the push service
    *
    * @param {Function} success Mandatory function. The callback function that is invoked if the unregistration is successful
    * @param {Function} failure Mandatory function. The callback function that is invoked if the unregistration fails 
	* 
	* @methodOf MFPPush#  
    */		
	function unregisterDevice(success: Function, failure: Function): void;
	
    /**
    * Registers the callback method used for receiving the notifications
    *
    * @param {Function} callback Mandatory function. The callback function that receives the notification
    */		
	function registerNotificationsCallback(callback: Function): void;	
		
    /**
	 * Completes the background job after receiving the silent notification. This API is applicable for iOS environment. 
	 * When the silent notification arrives and the background job is completed, need to call this method to notify that
	 * the background job is completed.
	 *
	 * @param {string} id  Mandatory string. The callback-id received as part of notification properties
	 * @param {number} result Optional. The result of background activity. A negative number indicates failure, 
	 * 							zero tells no data and positive number tells the data downloaded. 
	 * @methodOf MFPPush#
	*/		
	function backgroundJobDone(id: string, result?: number): void;	
}