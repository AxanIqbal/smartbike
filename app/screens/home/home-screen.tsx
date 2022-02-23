import React, { FC } from "react"
import { Alert, ImageStyle, StatusBar, TextStyle, View, ViewStyle } from "react-native"
import { Battery, Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { useAppSelector } from "../../store/store"
import { isLoaded } from "react-redux-firebase"
import * as Location from "expo-location"
import { useKeepAwake } from "expo-keep-awake"
import { MyWebsocket } from "../../services/websocket"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  top: 50,
}

const kmStyle1: TextStyle = {
  fontSize: 20,
  marginTop: 10,
  color: `${color.appcolor}`,
}

// const HeaderStyle: ViewStyle = {
//   backgroundColor: color.appcolor,
//   justifyContent: "space-around",
//   shadowOpacity: 0.34,
//   shadowRadius: 6.27,
//   elevation: 5,
// }

const animationStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "row",
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
  marginTop: -50,
  alignItems: "center",
}

const buttonView: ViewStyle = {
  flexDirection: "row",
  marginTop: 10,
  alignSelf: "center",
}

// const timeLIneStyle: ViewStyle = {
//   padding: 20,
//   paddingTop: 45,
//   backgroundColor: "white",
//   height: "100%",
// }

// const headerButton: ViewStyle = {
//   backgroundColor: "transparent",
// }

const kmStyle: TextStyle = {
  fontSize: 40,
  textAlign: "center",
  color: `${color.appcolor}`,
  paddingTop: 5,
  fontWeight: "bold",
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = ({ navigation }) => {
  useKeepAwake()
  const { profile } = useAppSelector((state) => state.firebase)

  React.useEffect(() => {
    StatusBar.setHidden(true)
    const test = new MyWebsocket()
    test.setup("ws://192.168.2.110/ws")
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission Error", "Permission to access location was denied")
      }
    })()
  }, [])

  return (
    <>
      <Screen unsafe={true} preset={"scroll"} style={ROOT}>
        <View style={animationStyle}>
          <AnimatedCircularProgress
            size={200}
            width={20}
            fill={profile.speed}
            rotation={225}
            arcSweepAngle={270}
            tintColor={color.appcolor}
            backgroundColor="#eeee">
            {
              () => (
                <Text style={kmStyle}>
                  {Math.round(profile.speed)}<Text style={kmStyle1}>m/s</Text>
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <AnimatedCircularProgress
            size={200}
            width={20}
            fill={isLoaded(profile) ? profile.battery : 0}
            rotation={0}
            tintColor={color.appcolor}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor={color.palette.offWhite}
          >
            {() =>
              isLoaded(profile) && (
                <Battery
                  style={imageStyle}
                  isCharging={profile.isCharging}
                  percentage={profile.battery}
                  height={200}
                  width={90}
                />
              )
            }
          </AnimatedCircularProgress>
        </View>
        <View style={buttonView}>
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
          <Button style={buttonStyle}>
            <MaterialCommunityIcons
              onPress={() => navigation.navigate("Signup")}
              size={25}
              name="account"
              color={color.appcolor}
            />
          </Button>
        </View>
      </Screen>
    </>
  )
}
