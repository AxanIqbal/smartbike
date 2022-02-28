import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TimeLine } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { Header } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { StackScreenProps } from "@react-navigation/stack"
import { useAppSelector } from "../../store/store"
import { isEmpty, isLoaded, populate, useFirebaseConnect } from "react-redux-firebase"
import { UserProfile } from "../../store/slices/firebase.types"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
}

const headerButton: ViewStyle = {
  backgroundColor: "transparent",
}

const Textstyle: TextStyle = {
  fontSize: 20,
  marginTop: 10,
  color: `${color.palette.white}`,
}

const HeaderStyle: ViewStyle = {
  backgroundColor: color.appcolor,
  justifyContent: "space-around",
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 5,
}

const timeLIneStyle: ViewStyle = {
  padding: 20,
  paddingTop: 45,
  backgroundColor: "white",
  height: "100%",
}

export const HistoryScreen: FC<StackScreenProps<NavigatorParamList, "HistoryScreen">> = ({
  navigation,
}) => {
  const firebase = useAppSelector((state) => state.firebase)
  useFirebaseConnect([{ path: "bikes" }])
  const populatedProfile: UserProfile = populate(firebase, "profile", [
    { child: "bikes", root: "bikes", keyProp: "id" },
  ])
  return (
    <>
      <Header
        leftComponent={
          <Button style={headerButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons color="#ffff" name="arrow-left" size={25} />
          </Button>
        }
        centerComponent={<Text style={Textstyle}>TIMELINE</Text>}
        containerStyle={HeaderStyle}
        backgroundColor={color.appcolor}
      />
      <Screen unsafe={true} preset={"scroll"} style={ROOT}>
        <View style={timeLIneStyle}>
          <TimeLine
            history={
              isLoaded(populatedProfile) &&
              !isEmpty(populatedProfile) &&
              populatedProfile.bikes[0].history
            }
          />
        </View>
      </Screen>
    </>
  )
}
