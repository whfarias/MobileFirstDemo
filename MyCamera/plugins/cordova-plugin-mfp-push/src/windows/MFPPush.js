/*
   Licensed Materials - Property of IBM

   (C) Copyright 2016 IBM Corp.

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
 
var MFPPush = {
        
    /**
     * Initializes MFPPush instance. This is required for the client application to connect to MFPPush service with the right
     * application context. This API should be called first before using other MFPPush APIs.
     * 
     * @param success callback
     * @param failure callback 
     * @param timeout request timeout in seconds
     */
    initialize: function(success, failure, timeout) {
        if (typeof timeout !== "undefined" && typeof timeout === "number" && timeout === parseInt(timeout, 10)) {
            cordova.exec(success, failure, "MFPPushPlugin", "initialize", [timeout]);
        } else {
            cordova.exec(success, failure, "MFPPushPlugin", "initialize", [-1]);
        }
    },      
    
    /**
     * Checks whether Push Notification is supported on the device
     * 
     * @param success callback
     * @param failure callback 
     */
    isPushSupported: function(success, failure) {
        cordova.exec(success, failure, "MFPPushPlugin", "isPushSupported", []);
    },

    /**
     * Retrieves all the subscriptions of the device 
     * 
     * @param success callback - recieves array of subscribed tags
     * @param failure callback 
     */
    getSubscriptions: function(success, failure) {
        cordova.exec(success, failure, "MFPPushPlugin", "getSubscriptions", []);
    },

    /**
     * Retrieves all the available tags of the application
     * 
     * @param success callback
     * @param failure callback
     */
    getTags: function(success, failure) {
        cordova.exec(success, failure, "MFPPushPlugin", "getTags", []);
    },

    /**
     * Subscribes the device to the given tags
     * 
     * @param tags - The Tag array to subscribe to.
     * @param success callback
     * @param failure callback
     */

    subscribe: function(tags, success, failure) {
        cordova.exec(success, failure, "MFPPushPlugin", "subscribe", [tags.toString()]);
    },

    /**
     * Unsubscribes the device from the given tags
     * 
     * @param  tags - The Tag name array to unsubscribe from.
     * @param  success callback
     * @param  failure callback
     */

    unsubscribe: function(tags, success, failure) {
        cordova.exec(success, failure, "MFPPushPlugin", "unsubscribe", [tags.toString()]);
    },
    
  

    /**
     * Registers the device with the push service
     *
	 *	@param options Mandatory.
	 *        ios: { alert: boolean, badge: boolean, sound: boolean, categories: Object[] }
	 *        android: {}
	 *		  phoneNumber: String
	 *		  
	 *		  where 
	 *				phoneNumber - Phone number to receive the SMS based notifications
	 *				alert - To enable displaying alert messages
	 *				badge - To enable badge icons
	 *				sound - To enable playing sound
	 *				categories - iOS8 interactive notification categories 
	 *		  for example,
	 *			{
	 *				ios: {
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
  	 *				},
	 *				phoneNumber: "999999999"
  	 *			}	
     * @param success callback
     * @param failure callback
     */
    registerDevice: function(options, success, failure) {
		if (options === null || typeof options === "undefined") {
			cordova.exec(success, failure, "MFPPushPlugin", "registerDevice", [{}]);
		} else {
			cordova.exec(success, failure, "MFPPushPlugin", "registerDevice", [options]);
		}
    },

    /**
     * Unregisters the device from the push service
     * 
     * @param success callback
     * @param failure callback
     */
    unregisterDevice: function(success, failure) {
        cordova.exec(success, failure, "MFPPushPlugin", "unregisterDevice", []);
    },

    /**
     * Registers the callback method used for receiving the notifications
     * 
     * @param callback The callback function that receives the notification 
     */
    registerNotificationsCallback: function(callback) {
        cordova.exec(callback, null, "MFPPushPlugin", "registerNotificationsCallback", []);
    },

    /**
     * Completes the background job after receving the silent notification. This API is applicable for iOS environment. 
     * When the silent notification arrives and the background job is completed, need to call this method to notify that
     * the background job is completed.
     *
     * @param id  callback-id received as part of notification properties.
     * @param result of background activity
     */
    backgroundJobDone: function(id, result) {
        if(result == "undefined" || isNaN(result)){
            result = 1;
        }
        cordova.exec(null,null,"MFPPushPlugin","backgroundJobDone", [id, result]);
    }
};

MFPPush.initialize = function (success, failure, timeout) {
    if (typeof timeout !== "undefined" && typeof timeout === "number" && timeout === parseInt(timeout, 10)) {
        timeout = -1;
    }
    WL.App.getServerUrl(
		function (serverUrl) {
		    var index = serverUrl.indexOf('/mfp/apps');
		    if (index > -1) {
		        serverUrl = serverUrl.substr(0, index);
		        MFPPush.applicationRoute = serverUrl ;
		    }
		},
        function (error) {
            WL.Logger.error("MFPPush:initialize() - An error occured while initializing MFPPush service.");
            failure("Failed to retereive server url");
        });
    MFPPush.applicationId = WL.StaticAppProps.APP_ID;
    MFPPush.timeout = timeout;
    MFPPush.isInitialzed = true;
    success();
}

MFPPush.isPushSupported = function(success, failure) {
    WL.Logger.info("Push is supported for windows universal environments");
    success();
}

MFPPush.getSubscriptions = function(success, failure) {
    var options = {};
    options.scope = MFPPush.__scope;
    if (MFPPush.timeout != -1) {
        options.timeout = MFPPush.timeout * 1000;
    }
    var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/subscriptions" + "?deviceId=" + MFPPush.deviceId;
    var resourceRequest = new WLResourceRequest(path, WLResourceRequest.GET,options);

    function onGetSubscriptionsSuccess(transport) {
        WL.Logger.info("MFPPush:getSubscriptions() - Successfully retreived subscription.  The response is: " + JSON.stringify(transport));
        var tags = {};
        var tagNames = {};
        var responseText = JSON.parse(transport.responseText);
        tags = responseText.subscriptions;
        var tagsCnt = tags.length;
        for (var tagsIdx = 0; tagsIdx < tagsCnt; tagsIdx++) {
            tagNames[tagsIdx] = tags[tagsIdx].tagName;
        }
        success(tagNames);
    }

    function onGetSubscriptionsFailure(transport) {
        WL.Logger.error("MFPPush:getSubscriptions() - An error occured while retreiving MFPPush Subscriptions.");
        failure(transport);
    }
    resourceRequest.send().then(onGetSubscriptionsSuccess, onGetSubscriptionsFailure);
}

MFPPush.getTags = function(success, failure) {
    var options = {};
    options.scope = MFPPush.__scope;
    if (MFPPush.timeout != -1) {
        options.timeout = MFPPush.timeout * 1000;
    }
    var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/tags";
    var resourceRequest = new WLResourceRequest(path, WLResourceRequest.GET,options);

    function onGetTagsSuccess(transport) {
        WL.Logger.info("MFPPush:getTags() - Successfully retreived tags.  The response is: "+ JSON.stringify(transport));
        var tags = {};
        var tagNames = {};
        var responseText = JSON.parse(transport.responseText);
        tags = responseText.tags;
        var tagsCnt = tags.length;
        for (var tagsIdx = 0; tagsIdx < tagsCnt; tagsIdx++) {
            tagNames[tagsIdx] = tags[tagsIdx].name;
        }
        success(tagNames);
    }

    function onGetTagsFailure(transport) {
        WL.Logger.error("MFPPush:getSubscriptions() - An error occured while retreiving MFPPush Subscriptions.");
        failure(transport);
    }
    resourceRequest.send().then(onGetTagsSuccess, onGetTagsFailure);
}

MFPPush.subscribe = function(tags, success, failure) {
    if (MFPPush.isTokenUpdatedOnServer) {
        var options = {};
        options.scope = MFPPush.__scope;
        if (MFPPush.timeout != -1) {
            options.timeout = MFPPush.timeout * 1000;
        }
        var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/subscriptions";
        var resourceRequest = new WLResourceRequest(path, WLResourceRequest.POST, options);
        WL.Logger.info("MFPPush:subscribe() - The tag subscription path is: "+ path);
        var subscriptionObject = {};
        subscriptionObject.deviceId = MFPPush.deviceId;
        subscriptionObject.tagNames = JSON.parse( JSON.stringify(tags));
        function onSubscribeSuccess(transport) {
            WL.Logger.info("MFPPush:subscribe() - Tag subscriptions successfully created.  The response is: " + transport);
            success(tags);
        }

        function onSubscribeFailure(transport) {
            WL.Logger.error("MFPPush:subscribe() - An error occured while subscribing to tags.");
            failure(transport);
        }
        resourceRequest.send(subscriptionObject).then(onSubscribeSuccess, onSubscribeFailure);
    }
}

MFPPush.unsubscribe = function(tags, success, failure) {
    if (MFPPush.isTokenUpdatedOnServer) {
        var options = {};
        options.scope = MFPPush.__scope;
        if (MFPPush.timeout != -1) {
            options.timeout = MFPPush.timeout * 1000;
        }
        var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/subscriptions?action=delete";
        var resourceRequest = new WLResourceRequest(path, WLResourceRequest.POST, options);
        WL.Logger.info("MFPPush:unsubscribe() - The tag unsubscription path is: "+ path);
        var subscriptionObject = {};
        subscriptionObject.deviceId = MFPPush.deviceId;
        subscriptionObject.tagNames = JSON.parse(JSON.stringify(tags));

        function onUnsubscribeSuccess(transport) {
            WL.Logger.info("MFPPush:unsubscribe() - Tag subscriptions successfully deleted.  The response is: " + transport);
            success(tags);
        }

        function onUnsubscribeFailure(transport) {
            WL.Logger.error("MFPPush:unsubscribe() - An error occured while unsubscribing the tags.");
            failure(transport);
        }
        resourceRequest.send(subscriptionObject).then(onUnsubscribeSuccess, onUnsubscribeFailure);
    }
}

MFPPush.setOptions = function(options, success, failure) {
    WL.Logger.info("In setOptions");
    success();
}

MFPPush.registerDevice = function(options, success, failure) {
    MFPPush.options = options;
    MFPPush.registerResponseSuccessListener = success;
    MFPPush.registerResponseFailureListener = failure;
    var pushNotifications = Windows.Networking.PushNotifications;
    var channelOperation = pushNotifications.PushNotificationChannelManager.createPushNotificationChannelForApplicationAsync();
    channelOperation.then(function (newChannel) {
        channel = newChannel;
        channel.addEventListener("pushnotificationreceived", MFPPush.__onPushNotification, false);
        MFPPush.__sendToken(newChannel.uri, false, success, failure);
    }, function (error) {
        WL.Logger.error("Cannot register with Windows Push Notification Service: " +  error.number);
    });
}

MFPPush.unregisterDevice = function(success, failure) {
    var options = {};
    options.scope = MFPPush.__scope;
    if (MFPPush.timeout != -1) {
        options.timeout = MFPPush.timeout * 1000;
    }
    var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/devices/" + MFPPush.deviceId;
    WL.Logger.info("MFPPush:unregisterDevice() - The device unregister url is: "+ path);
    var resourceRequest = new WLResourceRequest(path, WLResourceRequest.DELETE, options);
    function onUnregisterDeviceSuccess(transport) {
        WL.Logger.info("MFPPush:unregisterDevice() - Successfully unregistered device. Response is: " + transport);
        success("Device Successfully unregistered from receiving push notifications.");
    
    }
    function onUnregisterDeviceFailure(transport) {
        WL.Logger.error("MFPPush:unregisterDevice() - Failure during device registration.");
        failure(transport);
    }
    resourceRequest.send().then(onUnregisterDeviceSuccess, onUnregisterDeviceFailure);
}

MFPPush.registerNotificationsCallback = function(callback) {
    MFPPush.notificationListener = callback;
}

MFPPush.__sendToken = function(token, fromTokenRefresh) {
    MFPPush.deviceToken = token;
    MFPPush.regId = WL.Device.getHardwareIdentifier();
    WL.Logger.info("MFPPush: sendToken() - Successfully registered with WNS. Returned deviceToken is: " + token);
    //If the application is not running, then there is a probability that push instance is not initialized (if the app is closed)
    //during token refresh, so the check is made to ensure its initialized
    if (!MFPPush.isInitialzed && MFPPush.fromTokenRefresh) {
        MFPPush.initialize();
    }

    if (MFPPush.fromTokenRefresh) {
        hasRegisterParametersChanged = true;
        MFPPush.deviceId = MFPPush.regId;
        MFPPush.__updateTokenCallback(token, true);
    } else {
        MFPPush.__verifyDeviceRegistration();
    }	
}

MFPPush.__verifyDeviceRegistration = function() {
    var options = {};
    options.scope = MFPPush.__scope;
    if (MFPPush.timeout != -1) {
        options.timeout = MFPPush.timeout * 1000;
    }
    var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/devices/" + MFPPush.regId;
    var resourceRequest = new WLResourceRequest(path, WLResourceRequest.GET, options);
    function onVerifyDeviceRegistrationSuccess(transport) {
        var responseText = JSON.parse(transport.responseText);
        var retDeviceId = responseText.deviceId;
        var retToken = responseText.token;
        if (!(retDeviceId === MFPPush.regId) || !(retToken === MFPPush.deviceToken)) { 
            MFPPush.deviceId = retDeviceId;
            hasRegisterParametersChanged = true;
            MFPPush.__updateTokenCallback(MFPPush.deviceToken, false);
        } else {
            MFPPush.deviceId = retDeviceId;
            MFPPush.isTokenUpdatedOnServer = true;
            MFPPush.registerResponseSuccessListener(transport);
        }
    }

    function onVerifyDeviceRegistrationFailure(transport) {
        WL.Logger.error("Device is not registered");
        MFPPush.isNewRegistration = true;
        MFPPush.__updateTokenCallback(MFPPush.deviceToken, false);
    }
    resourceRequest.send().then(onVerifyDeviceRegistrationSuccess, onVerifyDeviceRegistrationFailure);
}

MFPPush.__buildDevice = function() {
    var deviceinfo = {};
    deviceinfo.deviceId = MFPPush.regId;
    deviceinfo.token = MFPPush.deviceToken;
    deviceinfo.platform = "W";
    if (MFPPush.options !== null && typeof MFPPush.options !== "undefined" && MFPPush.options.phoneNumber !== null && typeof MFPPush.options.phoneNumber === "number") {
         deviceinfo.phoneNumber = MFPPush.options.phoneNumber;
    }
    return deviceinfo;
}

MFPPush.__updateTokenCallback = function(deviceToken, fromTokenRefresh) {
    if (MFPPush.isNewRegistration) {
        var options = {};
        options.scope = MFPPush.__scope;
        if (MFPPush.timeout != -1) {
            options.timeout = MFPPush.timeout * 1000;
        }
        var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/devices/";
        var deviceinfo = MFPPush.__buildDevice();
        var resourceRequest = new WLResourceRequest(path, WLResourceRequest.POST, options);
        function onUpdateTokenCallbackSuccess(transport) {
            MFPPush.isNewRegistration = false;
            MFPPush.isTokenUpdatedOnServer = true;     
            MFPPush.deviceId = MFPPush.regId;
            WL.Logger.info("MFPPush:updateTokenCallback() - Successfully registered device.");
            MFPPush.registerResponseSuccessListener(transport);
        }
        function onUpdateTokenCallbackFailure(transport) {
            WL.Logger.error("MFPPush:updateTokenCallback() - Failure during device registration.");
            MFPPush.registerResponseFailureListener(transport);
        }
        resourceRequest.send(deviceinfo).then(onUpdateTokenCallbackSuccess, onUpdateTokenCallbackFailure);
    } else if(MFPPush.hasRegisterParametersChanged) {
        WL.Logger.info("MFPPush:updateTokenCallback() - Device is already registered. Registration parameters have changed.");
        var options = {};
        options.scope = MFPPush.__scope;
        if (MFPPush.timeout != -1) {
            options.timeout = MFPPush.timeout * 1000;
        }
        var path = MFPPush.applicationRoute + "/imfpush/v1/apps/" + MFPPush.applicationId + "/devices/" + MFPPush.deviceId;
        var deviceinfo = MFPPush.__buildDevice();
        var resourceRequest = new WLResourceRequest(path, WLResourceRequest.PUT, options);
        function onUpdateTokenParamsChangedCallbackSuccess(transport) {
            MFPPush.isNewRegistration = false;
            MFPPush.isTokenUpdatedOnServer = true;     
            WL.Logger.info("MFPPush:updateTokenCallback() - Device registration successfully updated.");
            if (!fromTokenRefresh) {
                MFPPush.registerResponseSuccessListener(transport);
            }
        }
        function onUpdateTokenParamsChangedCallbackFailure(transport) {
            WL.Logger.error("MFPPush:updateTokenCallback() - Failure during device registration.");
            if(!fromTokenRefresh) {
                MFPPush.registerResponseFailureListener(transport);
            }   
        }
        resourceRequest.send(deviceinfo).then(onUpdateTokenParamsChangedCallbackSuccess, onUpdateTokenParamsChangedCallbackFailure);
    } else {
        MFPPush.isTokenUpdatedOnServer = true;
        MFPPush.registerResponseSuccessListener(MFPPush.deviceId);
    }
}

MFPPush.__onPushNotification = function (e) {
    //Setting e.cancel = true 'separately' for toast and raw notifications
    //as tile and badge notifications are not handled here.
    var pushNotifications = Windows.Networking.PushNotifications;
    switch (e.notificationType) {
        case pushNotifications.PushNotificationType.toast:
            var props = {};
            var payload = {};
            props.type = 'toast';
            var toastXml = e.toastNotification.content;
            var toastNode = toastXml.selectSingleNode("/toast");
            var launch = toastNode.getAttribute("launch");
            if(launch != null && launch.length != 0) {
                payload = JSON.parse(launch);
                props.alert = payload.alert;
                delete payload.alert;                 
            }
                
            var binding = toastXml.selectSingleNode("/toast/visual/binding");
            props.template = binding.getAttribute("template");
                
            props.text = [];                
            var textElements = toastXml.getElementsByTagName("text");
            for(var i = 0; i < textElements.length; i++) {
                var text = textElements.getAt(i);
                props.text[i] = {};
                props.text[i].id = text.getAttribute("id");
                var content = text.firstChild;
                if (content != null) {
                    props.text[i].content = content.data;
                }
            }
                
            MFPPush.__onmessage(props, payload);
            e.cancel = true;
            break;

        case pushNotifications.PushNotificationType.raw:
            var notificationPayload = e.rawNotification.content;
            var props = {};
            props.type = 'raw';
            MFPPush.__onmessage(props, JSON.parse(notificationPayload));
            e.cancel = true;
            break;
    }
}

MFPPush.__onmessage = function(props, payload) {
    try {
        if (MFPPush.notificationListener != null) {
            var message = {};
            message.props = props;
            message.payload = payload;
            MFPPush.notificationListener(message);
        }
    }
    catch (e) {
        WL.Logger.error("Failed invoking notification callback function: " + e.message);
    }
}

MFPPush.deviceToken = null;
MFPPush.options = null;
MFPPush.regId = null;
MFPPush.__scope = "push.mobileclient";
MFPPush.onMessageReceiverRegistered = false;
MFPPush.isNewRegistration = false;
MFPPush.deviceId = null;
MFPPush.instance = null;
MFPPush.isTokenUpdatedOnServer = false;
MFPPush.applicationRoute = null;
MFPPush.applicationId = null;
MFPPush.timeout = -1;
MFPPush.isInitialzed = false;
MFPPush.registerResponseSuccessListener = null;
MFPPush.registerResponseFailureListener = null;
MFPPush.notificationListener = null;

module.exports = MFPPush;
