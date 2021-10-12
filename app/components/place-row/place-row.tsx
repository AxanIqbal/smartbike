import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import Entypo from "react-native-vector-icons/Entypo"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 10,
}

const TEXT: TextStyle = {
  padding: 10,
  backgroundColor: color.palette.offWhite,
  borderRadius: 1000,
}

const locationText: TextStyle = {
  padding: 10,
  color: color.palette.black,
}

export interface PlaceRowProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?: any
}

/**
 * Describe your component here
 */
export const PlaceRow = observer(function PlaceRow(props: PlaceRowProps) {
  const { style, data } = props
  const styles = flatten([CONTAINER, style])
  console.log(data)

  return (
    <View style={styles}>
      <View style={TEXT}>
        <Entypo name="location-pin" size={20} color={'grey'} />
      </View>
      <Text style={locationText}>{data.description}</Text>
    </View>
  )
})
