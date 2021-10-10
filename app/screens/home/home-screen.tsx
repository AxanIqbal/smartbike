import React from "react"
import { ViewStyle, TextStyle, View, Image, ImageStyle, ScrollView } from "react-native"
import { Button, Screen, Text, TimeLine } from "../../components"
import { color } from "../../theme"
import { Header } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AnimatedCircularProgress } from "react-native-circular-progress"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
}

const Textstyle: TextStyle = {
  fontSize: 20,
}

const HeaderStyle: ViewStyle = {
  backgroundColor: color.appcolor,
  justifyContent: "space-around",
  height: 86,
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 5,
}

const animationStyle: ViewStyle = {
  alignItems: "center",
  paddingTop: 30,
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
  marginTop: 30,
  alignSelf: "center",
}

const timeLIneStyle: ViewStyle = {
  flex: 1,
  padding: 20,
  paddingTop: 65,
  backgroundColor: "white",
}

export const HomeScreen = function HomeScreen() {
  return (
    <>
      <Header
        leftComponent={<MaterialCommunityIcons color="#ffff" name="format-align-left" size={25} />}
        centerComponent={<Text style={Textstyle}>HOME</Text>}
        rightComponent={<MaterialCommunityIcons color="#ffff" name="bike" size={25} />}
        containerStyle={HeaderStyle}
        backgroundColor={color.appcolor}
      />
        <ScrollView style={ROOT}>
          <View style={animationStyle}>
            <AnimatedCircularProgress
              size={250}
              width={20}
              fill={70}
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
          <View style={timeLIneStyle}>
            <TimeLine />
          </View>
        </ScrollView>
    </>
  )
}
