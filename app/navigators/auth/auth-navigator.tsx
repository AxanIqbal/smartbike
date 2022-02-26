import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen, SignupScreen } from "../../screens"

export type AuthParamList = {
  login: undefined
  signUp: undefined
}

const Stack = createStackNavigator<AuthParamList>()
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
      initialRouteName={"login"}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name={"signUp"} component={SignupScreen} />
    </Stack.Navigator>
  )
}
