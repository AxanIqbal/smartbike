/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { Dimensions, TouchableOpacity, useColorScheme, View, ViewStyle } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DistanceScreen, HomeScreen, MapsScreen, SearchScreen } from "../screens"
import Icon from "react-native-vector-icons/FontAwesome5"
import { color } from "../theme"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Button } from "../components"

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
  drawer: undefined
  welcome: undefined
  MapsScreen: undefined
  SearchScreen: undefined
  DistanceScreen: undefined
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
const DStack = createDrawerNavigator<NavigatorParamList>()

const DrawerStack = ({ navigation }) => {
  return (
    <DStack.Navigator initialRouteName="welcome">
      <DStack.Screen options={{ headerShown: false }} name="welcome" component={HomeScreen} />
      <DStack.Screen
        name="MapsScreen"
        component={MapsScreen}
        options={{
          headerTransparent: true,
          title: "",
          headerLeft: () => (
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
          ),
        }}
      />
      <DStack.Screen options={{ headerShown: false }} name="DistanceScreen" component={DistanceScreen} />
      <DStack.Screen options={{ headerShown: false }} name="SearchScreen" component={SearchScreen} />
    </DStack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="drawer"
    >
      <Stack.Screen name="drawer" component={DrawerStack} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
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
const exitRoutes = ["drawer"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
