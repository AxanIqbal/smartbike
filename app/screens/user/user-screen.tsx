import React, { FC } from "react"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Battery, Button, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { Header } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { isLoaded, populate, useFirebaseConnect } from "react-redux-firebase"
import { useAppSelector } from "../../store/store"
import { UserProfile } from "../../store/slices/firebase.types"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { StackScreenProps } from "@react-navigation/stack"
import { connect } from "react-redux"

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
  color: "rgba(82,82,82,0.76)",
}

const content: TextStyle = {
  color: "rgba(82,82,82,0.76)",
}

interface UserScreenProps {
  populatedProfile: UserProfile
}

const imageStyle1: ImageStyle = {
  marginTop: -60,
  alignItems: "center",
}

const ButtonStyle: ViewStyle = {
  marginHorizontal: 10,
  height: 50,
  borderRadius: 10,
  backgroundColor: color.palette.white,
  borderWidth: 1,
  borderColor: color.appcolor,
  marginVertical: 20,
}

const UserScreen: FC<StackScreenProps<NavigatorParamList, "UserScreen"> & UserScreenProps> = ({
                                                                                                navigation,
                                                                                                populatedProfile,
                                                                                              }) => {
  const firebase = useAppSelector((state) => state.firebase)
  const { profile } = useAppSelector((state) => state.firebase)
  useFirebaseConnect([{ path: "bikes" }])
  // const populatedProfile: UserProfile = populate(firebase, "profile", [
  //   { child: "bikes", root: "bikes", keyProp: "id" },
  // ])

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
            {() => (
              isLoaded(profile) && (
                <Battery
                  style={imageStyle1}
                  isCharging={profile.isCharging}
                  percentage={profile.battery}
                  height={250}
                  width={110}
                />
              )
            )}
          </AnimatedCircularProgress>
        </View>
        <View>
          <View style={innerContainer}>
            <Text style={heading}>Bike Id:</Text>
            <Text style={content}>uaidnca899q3ne328</Text>
          </View>
          <View style={innerContainer}>
            <Text style={heading}>Bike Model:</Text>
            <Text style={content}>i8wqind832dj82jqo</Text>
          </View>
          <View style={innerContainer}>
            <Text style={heading}>User name:</Text>
            <Text style={content}>uacuicnaiuc9320</Text>
          </View>
          <View style={innerContainer}>
            <Text style={heading}>User Email:</Text>
            <Text style={content}>aciuniuaciw8d9</Text>
          </View>
        </View>
        <Button
          style={ButtonStyle}
          onPress={async () => {
            // await firebase.updateProfile({
            //   bikes: ["a"],
            // })
          }}
        >
          <Text style={{color: color.appcolor, fontSize: 17}}>Logout</Text>
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
