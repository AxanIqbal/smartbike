package com.smartbike;

import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {


   @Override
       public void onCreate(Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);

           final Thread.UncaughtExceptionHandler oldHandler = Thread.getDefaultUncaughtExceptionHandler();

           Thread.setDefaultUncaughtExceptionHandler(
             new Thread.UncaughtExceptionHandler() {
                 @Override
                 public void uncaughtException(Thread paramThread, Throwable paramThrowable) {
                     restartApp();
                     if (oldHandler != null)
                         oldHandler.uncaughtException(paramThread, paramThrowable); //Delegates to Android's error handling
                     else
                         System.exit(2); //Prevents the service/app from freezing
                 }
           });
       }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "smartbike";
  }

  /**
   * Required for proper react-native-gesture-handler touch handling
   * https://docs.swmansion.com/react-native-gesture-handler/docs/#updating-mainactivityjava
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(
      this,
      new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
          return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      }
    );
  }

  @Override
  public void onBackPressed() {
  	// nothing to do here
  	// … really
  }

  public void restartApp(){
          Intent i = getBaseContext().getPackageManager()
              .getLaunchIntentForPackage( getBaseContext().getPackageName() );
          i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                     | Intent.FLAG_ACTIVITY_CLEAR_TASK
                     | Intent.FLAG_ACTIVITY_NEW_TASK);

          startActivity(i);
      }

}
