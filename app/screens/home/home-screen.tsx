import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TimeLine } from "../../components"
import { color } from "../../theme"
import { Header } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { NavigatorParamList } from "../../navigators"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { watchCurrentLocation } from "../../utils/geolocation"
import { useAppDispatch } from "../../store/store"
import { selectCords, setLocation } from "../../store/slices"
import { useSelector } from "react-redux"

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
  fontSize:25,
  textAlign:'center',
  color: `${color.appcolor}`,
  paddingTop: 5,
  fontWeight: 'bold',
}

export const HomeScreen: FC<DrawerScreenProps<NavigatorParamList, "welcome">> = ({
  navigation,
}) => {
  console.log(useSelector(selectCords))
  React.useEffect(() => {
    // getCurrentLocation().then(r => {
    //   console.log(r)
    //   dispatch(setLocation(r.coords))
    // }, reason => {
    //   console.log(reason)
    // })

    return () => {
      // stopObserving()
    }
  }, [])

  return (
    <>
      <Header
        leftComponent={
          <Button style={headerButton} onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons color="#ffff" name="format-align-left" size={25} />
          </Button>
        }
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
            fill={75}
            rotation={180}
            tintColor={color.appcolor}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor={color.palette.offWhite}
          >
            {(fill) => <Image source={require("./ChargingAnimation.png")} style={imageStyle} />}
          </AnimatedCircularProgress>
        </View>
        <View style={buttonView}>
          <Button style={buttonStyle}>
            <MaterialCommunityIcons size={25} name="history" color={color.appcolor} />
          </Button>
          <Button style={buttonStyle}>
            <MaterialCommunityIcons size={25} name="map-marker" color={color.appcolor} />
          </Button>
          <Button style={buttonStyle}>
            <MaterialCommunityIcons size={25} name="account" color={color.appcolor} />
          </Button>
        </View>
        <Text style={HeadingStyle} text="Your TimeLine" />
        <View style={timeLIneStyle}>
          <TimeLine />
        </View>
      </Screen>
    </>
  )
}
