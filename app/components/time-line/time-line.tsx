import * as React from "react"
import { useEffect, useState } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import Timeline from "react-native-timeline-flatlist"
import { LocationHistory } from "../../store/slices/firebase.types"
import _ from "lodash"
import moment from "moment"


const CONTAINER: ViewStyle = {
  height: "100%",
}

const ListStyle: TextStyle = {
  flex: 1,
  marginTop: -25,
}

const timeStyle: TextStyle = {
  textAlign: "center",
  // backgroundColor: `${color.appcolor}`,
  color: `${color.appcolor}`,
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
  history: LocationHistory[]
}

/**
 * Describe your component here
 */
export const TimeLine = function TimeLine(props: TimeLineProps) {
  const { history } = props
  const [timeValues, setTimeValues] = useState([])
  // let historyFormat
  useEffect(() => {
    if (history) {
      const historyFormat = []
      _.map(history, (values) => {
        historyFormat.push({ time: String(moment(values.timeStamp).format("hh:mm a")), title: "", description: values.address })
      })
      setTimeValues(historyFormat)
      console.log(historyFormat)
    }
  }, [history])

  return (
    <View style={CONTAINER}>
      <Timeline
        style={ListStyle}
        data={timeValues}
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
