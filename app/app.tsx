import "./i18n"
import "./utils/ignore-warnings"
import "@react-native-firebase/auth"
import "@react-native-firebase/database"
import React, { useEffect } from "react"
import firebase from "@react-native-firebase/app"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"

import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/error/error-boundary"
import { LoadingScreen } from "./screens"
import { store } from "./store/store"
import { Provider } from "react-redux"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
function App() {
  // const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)
  const rrfConfig = {
    userProfile: "users",
    // useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  }
  const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
  }

  useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      // setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!isNavigationStateRestored)
    return (
      <SafeAreaProvider>
        <LoadingScreen />
      </SafeAreaProvider>
    )

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ErrorBoundary catchErrors={"always"}>
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </ErrorBoundary>
          </SafeAreaProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </ToggleStorybook>
  )
}

export default App
