import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { flatten } from "ramda"
import {Text} from "../text/text"
import Entypo from "react-native-vector-icons/Entypo"

const CONTAINER: ViewStyle = {
  backgroundColor:color.palette.white,
  flexDirection: "row",
  padding: 10,
  borderRadius: 30,
}

const TEXT: TextStyle = {
  padding: 10,
  backgroundColor: color.palette.offWhite,
  borderRadius: 1000,
}

const locationText: TextStyle = {
  padding: 10,
  color: color.palette.black,
  width: Dimensions.get('screen').width * 0.7,
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
export const PlaceRow = function PlaceRow(props: PlaceRowProps) {
  const { style, data } = props
  const styles = flatten([CONTAINER, style])
  console.log(data)

  return (
    <View style={styles}>
      <View style={TEXT}>
        <Entypo name="location-pin" size={20} color={'grey'} />
      </View>
      <Text numberOfLines={1} style={locationText}>{data.description}</Text>
    </View>
  )
}
