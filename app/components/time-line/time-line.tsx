import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import Timeline from "react-native-timeline-flatlist"

const CONTAINER: ViewStyle = {
  height: 350,
}


const ListStyle: TextStyle = {
  flex: 1,
  marginTop: -25,
}

export interface TimeLineProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const data = [
  { date: "October, 11 2021", time: "09:00", description: "Event 1 Description" },
  { time: "10:45", description: "Event 2 Description" },
  { time: "12:00", description: "Event 3 Description" },
  { time: "14:00", description: "Event 4 Description" },
  { time: "16:30", description: "Event 5 Description" },
  { time: "16:30", description: "Event 5 Description" },
  { time: "16:30", description: "Event 5 Description" },
]
/**
 * Describe your component here
 */
export const TimeLine = observer(function TimeLine(props: TimeLineProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={CONTAINER}>
      <Timeline
        style={ListStyle}
        data={data}
        circleSize={20}
        circleColor={color.appcolor}
        lineColor={color.appcolor}
        // // timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        // timeStyle={{
        //   textAlign: "center",
        //   backgroundColor: "#ff9797",
        //   color: "white",
        //   padding: 5,
        //   borderRadius: 13,
        // }}
        descriptionStyle={{ color: "gray" }}
        // // options={{
        // //   style: { paddingTop: 5 },
        // // }}
        // // innerCircle={"icon"}
        // separator={false}
        detailContainerStyle={{
          marginBottom: 40,
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 10,
          marginTop: -40,
        }}
        columnFormat="two-column"
      />
    </View>
  )
})
