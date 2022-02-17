/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { Dimensions, useColorScheme, View, ViewStyle } from "react-native"
// import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
// import { createDrawerNavigator } from "@react-navigation/drawer"
import {
  DistanceScreen,
  HistoryScreen,
  HomeScreen,
  MapsScreen,
  SearchScreen,
  UserScreen,
} from "../screens"
import Icon from "react-native-vector-icons/FontAwesome5"
import { color } from "../theme"
import { Button, Drawer } from "../components"
import { createDrawerNavigator, useDrawerProgress } from "@react-navigation/drawer"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { AuthStack } from "./auth/auth-navigator"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { isEmpty } from "react-redux-firebase"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Animated, { Adaptable } from "react-native-reanimated"

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

const buttonStyle: ViewStyle = {
  backgroundColor: `${color.palette.white}`,
  height: 50,
  marginHorizontal: 20,
  borderRadius: 100,
  width: 50,
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const DStack = createDrawerNavigator()

const DrawerStack = () => {
  return (
    <DStack.Navigator
      initialRouteName="screens"
      screenOptions={{
        drawerStyle: {
          flex: 1,
          width: "40%",
          backgroundColor: color.appcolor,
        },
        drawerType: "slide",
        overlayColor: "transparent",
        sceneContainerStyle: {
          backgroundColor: color.appcolor,
        },
      }}
      drawerContent={(props) => <Drawer {...props} />}
    >
      <DStack.Screen options={{ headerShown: false, title: "Welcome" }} name="screens">
        {(props) => <AppStack {...props} />}
      </DStack.Screen>
    </DStack.Navigator>
  )
}

const AppStack = ({ navigation }) => {
  const progress = useDrawerProgress()
  const scale = Animated.interpolateNode(progress as Adaptable<number>, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  })

  const screenStyle = {
    transform: [{ scale }],
  }
  return (
    <Animated.View style={[{ flex: 1 }, screenStyle]}>
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
            headerLeft: headerLeft,
          }}
        />
        <Stack.Screen name={"UserScreen"} component={UserScreen} />
        <Stack.Screen name={"HistoryScreen"} component={HistoryScreen} />
        <Stack.Screen
          options={{
            headerTransparent: true,
            title: "",
            headerLeft: headerLeft,
          }}
          name="DistanceScreen"
          component={DistanceScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SearchScreen"
          component={SearchScreen}
        />
      </Stack.Navigator>
    </Animated.View>
  )

  function headerLeft() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          width: Dimensions.get("window").width - 60,
          marginTop: 20,
        }}
      >
        <Button onPress={() => navigation.goBack()} style={buttonStyle}>
          <Icon name="arrow-left" color={color.appcolor} size={25} />
        </Button>
      </View>
    )
  }
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  // @ts-ignore
  const auth = useSelector<RootState>((state) => state.firebase.auth)
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {isEmpty(auth) ? <AuthStack /> : <DrawerStack />}
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
