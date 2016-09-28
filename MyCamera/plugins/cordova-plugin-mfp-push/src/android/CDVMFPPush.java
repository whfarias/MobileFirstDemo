/*
   Licensed Materials - Property of IBM

   (C) Copyright 2016 IBM Corp.

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

package com.ibm.mobilefirstplatform.clientsdk.cordovaplugins.push;

import com.worklight.common.Logger;
import com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPush;
import com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPSimplePushNotification;
import com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPushException;
import com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPushNotificationListener;
import com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPushResponseListener;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.Arrays;

public class CDVMFPPush extends CordovaPlugin {

    private static final Logger pushLogger = Logger.getInstance("com.ibm.mobilefirstplatform.clientsdk.cordovaplugins.push.CDVMFPPush");

    private static CallbackContext notificationCallback;

    private static MFPPushNotificationListener notificationListener;

    private static boolean ignoreIncomingNotifications = false;

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        pushLogger.debug("execute() : action = " + action);

        if ("initialize".equals(action)) {
        	int timeout = args.getInt(0);
            this.initialize(timeout, callbackContext);

            return true;
        } else if ("isPushSupported".equals(action)) {
            this.isPushSupported(callbackContext);

            return true;
        }  else if ("registerDevice".equals(action)) {
            JSONObject options = null;
            if(args.length() > 0)
                options = (JSONObject)args.get(0);

            this.registerDevice(callbackContext,options);
            return true;
        } else if ("unregisterDevice".equals(action)) {
            this.unregisterDevice(callbackContext);

            return true;
        } else if ("getSubscriptions".equals(action)) {
            this.getSubscriptions(callbackContext);

            return true;
        } else if ("getTags".equals(action)) {
            this.getTags(callbackContext);

            return true;
        } else if ("subscribe".equals(action)) {
            String[] tags = args.getString(0).split(",");
            this.subscribe(tags, callbackContext);

            return true;
        } else if ("unsubscribe".equals(action)) {
			String[] tags = args.getString(0).split(",");
            this.unsubscribe(tags, callbackContext);

            return true;
        } else if ("registerNotificationsCallback".equals(action)) {
            this.registerNotificationsCallback(callbackContext);

            return true;
        }
        return false;
    }
    
    /**
     * Initializes MFPPush instance
     * @param timeout request timeout in seconds
     * @param callbackContext Javascript callback
     */    
    private void initialize(int timeout, final CallbackContext callbackContext) {
    	try  {
    		MFPPush.getInstance().initialize(this.cordova.getActivity().getApplicationContext(), timeout);
    		callbackContext.success();
    	} catch (Exception e) {
    		callbackContext.error(e.toString());
    	}
    }
    
    
    /**
     * Checks whether push notification is supported.
     * @param callbackContext Javascript callback
     */    
    private void isPushSupported(final CallbackContext callbackContext) {
    	try  {
        	boolean isPushSupported = MFPPush.getInstance().isPushSupported();
        	callbackContext.success(Boolean.toString(isPushSupported));
    	} catch (Exception e) {
    		callbackContext.error(e.toString());
    	}
    }    
    /**
     * Sets the push notification options.
     * 	
     * @param options:
	 *        ios: { alert: boolean, badge: boolean, sound: boolean, categories: Object[] }
	 *        android: {}
     * @param callbackContext Javascript callback
     */ 
    private void setOptions(final String options, final CallbackContext callbackContext) {
    	pushLogger.debug("In setOptions");
    	callbackContext.success();
    }
    
    /**
     * Registers the device with the push service
     * @param callbackContext Javascript callback
     * @param options:
	 *        ios: { alert: boolean, badge: boolean, sound: boolean, categories: Object[] }
	 *        android: {}
     * 		  phoneNumber: String	 
     * 
     */
    private void registerDevice(final CallbackContext callbackContext, final JSONObject options) {
    	pushLogger.debug("In registerDevice");
        JSONObject optionsJSON = null;
        String phoneNumber = null;
        try {

            if(options != null) {
                if(options.has("android"))
                    optionsJSON = (JSONObject)options.get("android");
                if(options.has("phoneNumber"))
                    phoneNumber = (String) options.get("phoneNumber");
                if(phoneNumber != null && optionsJSON == null) {
                    optionsJSON = new JSONObject();
                }
                if(phoneNumber != null) {
                    optionsJSON.put("phoneNumber", options.get("phoneNumber"));
                }
            }
        }
        catch(JSONException ex)
        {
            pushLogger.debug("In registerDevice json parsing exception");
        }
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                MFPPush.getInstance().registerDevice(options, new MFPPushResponseListener<String>() {
                    @Override
                    public void onSuccess(String s) {
                        pushLogger.debug("registerDevice() Success : " + s);
                        callbackContext.success(s);
                    }
                    @Override
                    public void onFailure(MFPPushException ex) {
                        pushLogger.debug("registerDevice() Error : " + ex.toString());
                        callbackContext.error(ex.toString());
                    }
                });
            }
        });

    }

    /**
     * Unregister the device from push service
     * @param callbackContext Javascript callback
     */
    private void unregisterDevice(final CallbackContext callbackContext) {
        pushLogger.debug("In unregisterDevice");

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                MFPPush.getInstance().unregisterDevice(new MFPPushResponseListener<String>() {
                    @Override
                    public void onSuccess(String s) {
                        pushLogger.debug("unregisterDevice() Success : " + s);
                        callbackContext.success(s);
                    }
                    @Override
                    public void onFailure(MFPPushException ex) {
                        pushLogger.debug("unregisterDevice() Error : " + ex.toString());
                        callbackContext.error(ex.toString());
                    }
                });
            }
        });

    }

    /**
     * Get the list of available tags that the device can subscribe to
     * @param callbackContext Javascript callback
     */
    private void getTags(final CallbackContext callbackContext) {
        pushLogger.debug("In getTags");

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                MFPPush.getInstance().getTags(new MFPPushResponseListener<List<String>>() {
                    @Override
                    public void onSuccess(List<String> tags) {
                        pushLogger.debug("getTags() Success : " + tags);
                        callbackContext.success(new JSONArray(tags));
                    }

                    @Override
                    public void onFailure(MFPPushException ex) {
                        pushLogger.debug("getTags() Error : " + ex.toString());
                        callbackContext.error(ex.toString());
                    }
                });
            }
        });

    }

    /**
     * Get the list of tags subscribed to
     * @param callbackContext Javascript callback
     */
    private void getSubscriptions(final CallbackContext callbackContext) {
        pushLogger.debug("In getSubscriptions");

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                MFPPush.getInstance().getSubscriptions(new MFPPushResponseListener<List<String>>() {
                    @Override
                    public void onSuccess(List<String> tags) {
                        pushLogger.debug("getSubscriptions() Success : " + tags);
                        callbackContext.success(new JSONArray(tags));
                    }

                    @Override
                    public void onFailure(MFPPushException ex) {
                        pushLogger.debug("getSubscriptions() Error : " + ex.toString());
                        callbackContext.error(ex.toString());
                    }
                });
            }
        });

    }

    /**
     * Subscribes to the given tag(s)
     * @param tags
     * @param callbackContext Javascript callback
     */
    private void subscribe(final String[] tags, final CallbackContext callbackContext) {
        pushLogger.debug("In subscribe");

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                    MFPPush.getInstance().subscribe(tags, new MFPPushResponseListener<String[]>() {
                        @Override
                        public void onSuccess(String[] s) {
                            pushLogger.debug("subscribe() Success : " + s);
							List<String> tagNames = Arrays.asList(s);
                            callbackContext.success(new JSONArray(tagNames));
                        }

                        @Override
                        public void onFailure(MFPPushException ex) {
                            pushLogger.debug("subscribe() Error : " + ex.toString());
                            callbackContext.error(ex.toString());
                        }
                     });
            }
        });

    }

    /**
     * Unsubscribes to the given tag(s)
     * @param tags
     * @param callbackContext Javascript callback
     */
    private void unsubscribe(final String[] tags, final CallbackContext callbackContext) {
        pushLogger.debug("In unsubscribe");

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                    MFPPush.getInstance().unsubscribe(tags, new MFPPushResponseListener<String[]>() {
                        @Override
                        public void onSuccess(String[] s) {
                            pushLogger.debug("unsubscribe() Success : " + s);
							List<String> tagNames = Arrays.asList(s);
                            callbackContext.success(new JSONArray(tagNames));
                        }

                        @Override
                        public void onFailure(MFPPushException ex) {
                            pushLogger.debug("unsubscribe() Error : " + ex.toString());
                            callbackContext.error(ex.toString());
                        }
                     });
            }
        });

    }

    private void registerNotificationsCallback(final CallbackContext callbackContext) {
        pushLogger.debug("In registerNotificationsCallback");

        notificationCallback = callbackContext;

        if(!ignoreIncomingNotifications) {

            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    notificationListener = new MFPPushNotificationListener() {
                        @Override
                        public void onReceive(final MFPSimplePushNotification message) {
                            try {
                                pushLogger.debug("Push notification received: " + message.toString());

                                JSONObject notification = new JSONObject();

                                notification.put("alert", message.getAlert());
                                notification.put("payload", message.getPayload());

                                PluginResult result = new PluginResult(PluginResult.Status.OK, notification);
                                result.setKeepCallback(true);
                                notificationCallback.sendPluginResult(result);
                            } catch(JSONException e) {
                                PluginResult result = new PluginResult(PluginResult.Status.ERROR, e.toString());
                                result.setKeepCallback(true);
                                notificationCallback.sendPluginResult(result);
                            }
                        }
                    };

                    MFPPush.getInstance().listen(notificationListener);
                }
            });

        } else {
            pushLogger.warn("Notification handling is currently off. Turn it back on by calling setIgnoreIncomingNotifications(true)");
            callbackContext.error("Error: Called registerNotificationsCallback() after IgnoreIncomingNotifications was set");
        }
    }

    /**
     * Change the plugin's default behavior to ignore handling push notifications
     * @param ignore boolean parameter for the 'ignore notifications' behavior
     */
    public static void setIgnoreIncomingNotifications(boolean ignore) {
        pushLogger.debug("In setIgnoreIncomingNotifications : ignore = " + ignore);
        ignoreIncomingNotifications = ignore;

        if(notificationListener != null) {
            if(ignore) {
                MFPPush.getInstance().hold();
            } else {
                MFPPush.getInstance().listen(notificationListener);
            }
        }

    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        pushLogger.debug("In onResume");

        if (!ignoreIncomingNotifications && MFPPush.getInstance() != null) {
            MFPPush.getInstance().listen(notificationListener);
        }
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);
        pushLogger.debug("In onPause");

        if (!ignoreIncomingNotifications && MFPPush.getInstance() != null) {
            MFPPush.getInstance().hold();
        }
    }

}