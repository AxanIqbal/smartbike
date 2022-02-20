import React, { FC } from "react"
import { Alert, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Battery, Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Header } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { isLoaded, useFirebase } from "react-redux-firebase"
import * as Location from "expo-location"
import { LocationAccuracy } from "expo-location"
import { useKeepAwake } from "expo-keep-awake"
import { setLocation } from "../../store/slices"

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

// const timeLIneStyle: ViewStyle = {
//   padding: 20,
//   paddingTop: 45,
//   backgroundColor: "white",
//   height: "100%",
// }

const headerButton: ViewStyle = {
  backgroundColor: "transparent",
}

// const HeadingStyle: TextStyle = {
//   fontSize: 25,
//   textAlign: "center",
//   color: `${color.appcolor}`,
//   paddingTop: 5,
//   fontWeight: "bold",
// }

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = ({ navigation }) => {
  useKeepAwake()
  const { profile } = useAppSelector((state) => state.firebase)
  const firebase = useFirebase()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    let subsLoc: Location.LocationSubscription
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission Error", "Permission to access location was denied")
        return
      }
      subsLoc = await Location.watchPositionAsync(
        {
          accuracy: LocationAccuracy.Balanced,
        },
        (location) => {
          console.log(location)
          dispatch(setLocation(location.coords))
          firebase.updateProfile({
            ...location.coords,
          })
        },
      )
    })()

    return () => {
      subsLoc.remove()
    }
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
      </Screen>
    </>
  )
}
