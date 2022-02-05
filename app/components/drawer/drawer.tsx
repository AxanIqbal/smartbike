import * as React from "react"
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"

/**
 * Describe your component here
 */
export function Drawer(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={"Home"} onPress={() => props.navigation.navigate("welcome")} />
      <DrawerItem label={"Home"} onPress={() => props.navigation.navigate("welcome")} />
      <DrawerItem label={"Home"} onPress={() => props.navigation.navigate("welcome")} />
    </DrawerContentScrollView>
  )
}
