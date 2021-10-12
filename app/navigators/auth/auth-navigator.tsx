import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  LoginScreen
} from "../../screens"

export type AuthParamList = {
  login: undefined
}

const Stack = createStackNavigator<AuthParamList>()
export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
