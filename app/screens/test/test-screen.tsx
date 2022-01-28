import React from "react"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const TestScreen = function TestScreen() {
  // Pull in one of our MST stores
  // useFirebaseConnect([
  //   'todos' // { path: '/todos' } // object notation
  // ])
  // const data = useSelector((state: RootState) => state.firebase.ordered.todos)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      {/* {data.map(d => { */}
      {/*  return <Text key={d.key} preset="header" text={`${d.value()} , ${d.key}`} /> */}
      {/* })} */}
      {/* <Text text={JSON.stringify(data, null, 2)}/> */}
    </Screen>
  )
}
