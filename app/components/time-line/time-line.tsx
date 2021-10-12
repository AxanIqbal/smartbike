import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import Timeline from "react-native-timeline-flatlist"

const CONTAINER: ViewStyle = {
  height: "100%",
}

const ListStyle: TextStyle = {
  flex: 1,
  marginTop: -25,
}

const timeStyle: TextStyle = {
  textAlign: "center",
  backgroundColor: `${color.appcolor}`,
  color: "white",
  padding: 7,
  borderTopLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
}

const detailStyle: ViewStyle = {
  marginBottom: 40,
  marginTop: -40,
}

export interface TimeLineProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const data = [
  { time: "October, 11 2021 \n 09:00", description: "Event 1 Description" },
  { time: "October, 11 2021 \n 10:45", description: "Event 2 Description" },
  { time: "October, 11 2021 \n 12:00", description: "Event 3 Description" },
  { time: "October, 11 2021 \n 14:00", description: "Event 4 Description" },
  { time: "October, 11 2021 \n 16:30", description: "Event 5 Description" },
  { time: "October, 11 2021 \n 16:30", description: "Event 5 Description" },
  { time: "October, 11 2021 \n 16:30", description: "Event 5 Description" },
]
/**
 * Describe your component here
 */
export const TimeLine = function TimeLine(props: TimeLineProps) {
  // const { style } = props
  // const styles = flatten([CONTAINER, style])

  return (
    <View style={CONTAINER}>
      <Timeline
        style={ListStyle}
        data={data}
        circleSize={20}
        circleColor={color.appcolor}
        lineColor={color.appcolor}
        timeStyle={timeStyle}
        descriptionStyle={{ color: "gray" }}
        detailContainerStyle={detailStyle}
        columnFormat="two-column"
      />
    </View>
  )
}
