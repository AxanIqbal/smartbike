import React, { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Battery, Button, Screen, Text, TimeLine } from "../../components"
import { color } from "../../theme"
import { Header } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { useAppSelector } from "../../store/store"
import { isEmpty, isLoaded, populate, useFirebase, useFirebaseConnect } from "react-redux-firebase"
import { UserProfile } from "../../store/slices/firebase.types"
import messaging from "@react-native-firebase/messaging"
import { saveTokenToDatabase } from "../../services/firebasetokens"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
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

const animationStyle: ViewStyle = {
  alignItems: "center",
  paddingTop: 20,
}

const buttonStyle: ViewStyle = {
  backgroundColor: "#ffff",
  width: 70,
  height: 70,
  margin: 10,
  borderRadius: 100,
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 5,
}

const imageStyle: ImageStyle = {
  width: 100,
  height: 220,
  marginTop: -50,
  alignItems: "center",
}

const buttonView: ViewStyle = {
  flexDirection: "row",
  marginTop: 10,
  alignSelf: "center",
}

const timeLIneStyle: ViewStyle = {
  padding: 20,
  paddingTop: 45,
  backgroundColor: "white",
  height: "100%",
}

const headerButton: ViewStyle = {
  backgroundColor: "transparent",
}

const HeadingStyle: TextStyle = {
  fontSize: 25,
  textAlign: "center",
  color: `${color.appcolor}`,
  paddingTop: 5,
  fontWeight: "bold",
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = ({ navigation }) => {
  const firebase = useAppSelector((state) => state.firebase)
  useFirebaseConnect([{ path: "bikes" }])
  const populatedProfile: UserProfile = populate(firebase, "profile", [
    { child: "bikes", root: "bikes", keyProp: "id" },
  ])
  const Firebase = useFirebase()

  React.useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        return saveTokenToDatabase(token, Firebase.updateProfile)
      })

    return messaging().onTokenRefresh(async (token) => {
      await saveTokenToDatabase(token, Firebase.updateProfile)
    })
  }, [])

  return (
    <>
      <Header
        centerComponent={<Text style={Textstyle}>HOME</Text>}
        rightComponent={
          <Button style={headerButton} onPress={() => navigation.navigate("MapsScreen")}>
            <MaterialCommunityIcons color="#ffff" name="bike" size={25} />
          </Button>
        }
        containerStyle={HeaderStyle}
        backgroundColor={color.appcolor}
      />
      <Screen unsafe={true} preset={"scroll"} style={ROOT}>
        <View style={animationStyle}>
          <AnimatedCircularProgress
            size={250}
            width={20}
            fill={
              isLoaded(populatedProfile) && !isEmpty(populatedProfile)
                ? populatedProfile?.bikes[0].battery
                : 0
            }
            rotation={0}
            tintColor={color.appcolor}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor={color.palette.offWhite}
          >
            {() =>
              isLoaded(populatedProfile) &&
              !isEmpty(populatedProfile) && (
                <Battery
                  style={imageStyle}
                  isCharging={populatedProfile.bikes[0].isCharging}
                  percentage={populatedProfile.bikes[0].battery}
                />
              )
            }
          </AnimatedCircularProgress>
        </View>
        <View style={buttonView}>
          <Button style={buttonStyle}>
            <MaterialCommunityIcons
              onPress={() => navigation.navigate("HistoryScreen")}
              size={25}
              name="history"
              color={color.appcolor}
            />
          </Button>
          <Button style={buttonStyle}>
            <MaterialCommunityIcons
              onPress={() => navigation.navigate("MapsScreen")}
              size={25}
              name="map-marker"
              color={color.appcolor}
            />
          </Button>
          <Button style={buttonStyle}>
            <MaterialCommunityIcons
              onPress={() => navigation.navigate("UserScreen")}
              size={25}
              name="account"
              color={color.appcolor}
            />
          </Button>
        </View>
        <Text style={HeadingStyle} text="Your TimeLine" />
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
