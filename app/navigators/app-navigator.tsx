/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
// import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
// import { createDrawerNavigator } from "@react-navigation/drawer"
import { DistanceScreen, HistoryScreen, HomeScreen, MapsScreen, SearchScreen } from "../screens"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { AuthStack } from "./auth/auth-navigator"
import { useAppSelector } from "../store/store"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import UserScreen from "../screens/user/user-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  MapsScreen: undefined
  SearchScreen: undefined
  UserScreen: undefined
  HistoryScreen: undefined
  DistanceScreen: {
    destinationLat: number
    destinationLng: number
    originLat: number
    originLng: number
  }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen
        options={{ headerShown: false, title: "Welcome" }}
        name="welcome"
        component={HomeScreen}
      />
      <Stack.Screen
        name="MapsScreen"
        component={MapsScreen}
        options={{
          headerTransparent: true,
          title: "",
        }}
      />
      <Stack.Screen name={"UserScreen"} component={UserScreen} />
      <Stack.Screen name={"HistoryScreen"} component={HistoryScreen} />
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: "",
        }}
        name="DistanceScreen"
        component={DistanceScreen}
      />
      <Stack.Screen options={{ headerShown: false }} name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  const auth = useAppSelector((state) => state.firebase.auth)
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {auth.isEmpty ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome", "login"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
