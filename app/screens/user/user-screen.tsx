import React, { FC } from "react"
import { Dimensions, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { Header } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { populate, useFirebase, useFirebaseConnect } from "react-redux-firebase"
import { useAppSelector } from "../../store/store"
import { UserProfile } from "../../store/slices/firebase.types"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { StackScreenProps } from "@react-navigation/stack"
import { connect } from "react-redux"
import messaging from "@react-native-firebase/messaging"

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

const animationStyle: ViewStyle = {
  alignItems: "center",
  paddingVertical: 20,
}

const innerContainer: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "rgba(247,140,42,0.36)",
  padding: 10,
  margin: 10,
  borderRadius: 10,
}

const heading: TextStyle = {
  width: Dimensions.get("screen").width * 0.25,
  paddingLeft: 10,
  fontSize: 15,
  fontWeight: "700",
}

const imageStyle: ImageStyle = {
  width: 100,
  height: 220,
  marginTop: -50,
  alignItems: "center",
}

interface UserScreenProps {
  populatedProfile: UserProfile
}

const UserScreen: FC<StackScreenProps<NavigatorParamList, "UserScreen"> & UserScreenProps> = ({
  navigation,
  populatedProfile,
}) => {
  const { auth } = useAppSelector((state) => state.firebase)
  useFirebaseConnect([{ path: "bikes" }])
  const firebase = useFirebase()

  return (
    <>
      <Header
        leftComponent={
          <Button style={headerButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons color="#ffff" name="arrow-left" size={25} />
          </Button>
        }
        centerComponent={<Text style={Textstyle}>PROFILE</Text>}
        containerStyle={HeaderStyle}
        backgroundColor={color.appcolor}
      />
      <Screen unsafe={true} preset={"scroll"} style={ROOT}>
        <View style={animationStyle}>
          <AnimatedCircularProgress
            size={250}
            width={20}
            fill={75}
            rotation={0}
            tintColor={color.appcolor}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor={color.palette.offWhite}
          >
            {() => <Image source={require("../home/ChargingAnimation.png")} style={imageStyle} />}
          </AnimatedCircularProgress>
        </View>
        <View>
          <View style={innerContainer}>
            <Text style={heading}>Bike Id:</Text>
            <Text>{populatedProfile.bikes[0].id}</Text>
          </View>
          <View style={innerContainer}>
            <Text style={heading}>Bike Model:</Text>
            <Text>{populatedProfile.bikes[0].model}</Text>
          </View>
          <View style={innerContainer}>
            <Text style={heading}>User name:</Text>
            <Text>{populatedProfile.name}</Text>
          </View>
          <View style={innerContainer}>
            <Text style={heading}>User Email:</Text>
            <Text>{auth.email}</Text>
          </View>
        </View>
        <Button
          style={{
            marginHorizontal: 20,
            height: 50,
            borderRadius: 5,
            backgroundColor: color.error,
          }}
          onPress={async () => {
            try {
              await messaging().deleteToken()
              await firebase.updateProfile({
                token: null,
              })
              await firebase.logout()
            } catch (e) {
              console.log(e)
            }
          }}
        >
          <Text style={{ color: color.palette.white, fontSize: 17 }}>LogOut</Text>
        </Button>
      </Screen>
    </>
  )
}

export default connect(({ firebase }) => ({
  profile: firebase.profile,
  populatedProfile: populate(firebase, "profile", [
    { child: "bikes", root: "bikes", keyProp: "id" },
  ]),
}))(UserScreen)
