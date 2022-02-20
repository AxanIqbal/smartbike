import React, { FC, useState } from "react"
import { Dimensions, Image, ImageStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useAppSelector } from "../../store/store"
import { StackScreenProps } from "@react-navigation/stack"
import { UserProfile } from "../../store/slices/firebase.types"
import { populate, useFirebaseConnect } from "react-redux-firebase"

const ROOT: ViewStyle = { width: "100%", height: "100%" }
// const blankScreen: ViewStyle = {
//   backgroundColor: color.palette.white,
//   zIndex: 10,
// }
const buttonStyle: ViewStyle = {
  backgroundColor: "transparent",
  position: "absolute",
  width: "100%",
  bottom: 20,
}
const buttonStyle1: ViewStyle = {
  backgroundColor: "transparent",
  position: "absolute",
  bottom: 100,
  alignSelf: "flex-end",
  right: 20,
}

const buttonStyle2: ViewStyle = {
  position: "relative",
  backgroundColor: "transparent",
  alignSelf: "flex-start",
  bottom: Dimensions.get("screen").height * 0.87,
}

const searchStyle: ViewStyle = {
  backgroundColor: color.palette.white,
  justifyContent: "flex-end",
  width: "90%",
  shadowRadius: 0.27,
  elevation: 2,
  padding: 20,
  borderRadius: 80,
}
const searchStyle1: ViewStyle = {
  backgroundColor: color.palette.white,
  justifyContent: "flex-end",
  shadowRadius: 0.27,
  elevation: 2,
  padding: 20,
  borderRadius: 80,
}

export const MapsScreen: FC<StackScreenProps<NavigatorParamList, "MapsScreen">> = ({
                                                                                     navigation,
                                                                                   }) => {
  const firebase = useAppSelector((state) => state.firebase)
  useFirebaseConnect([{ path: "bikes" }])
  const populatedProfile: UserProfile = populate(firebase, "profile", [
    { child: "bikes", root: "bikes", keyProp: "id" },
  ])
  const bikes = populatedProfile.bikes
  console.log(bikes[0])
  // const dispatch = useAppDispatch()
  const [map, setMap] = useState(null)
  // watchCurrentLocation().then(r => {
  //   console.log(r)
  // })

  // const dispatch = useAppDispatch()
  // watchCurrentLocation()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // const [text, setText] = useState("")
  // const updateSearch = (input: string) => {
  //   console.log(input)
  //   setText(input)
  // }
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const imageStyle: ImageStyle = {
    width: 50,
    height: 50,
    marginTop: 28,
    resizeMode: "contain",
    transform: [
      // {
      //   rotate: `${location.accuracy}deg`,
      // },
    ],
  }

  React.useEffect(() => {
    console.log("sub")
    // watchCurrentLocation().then(position => {
    //   console.log(position)
    //   dispatch(setLocation(position.coords))
    // },reason => {
    //   console.warn(reason)
    // })
    // Geolocation.watchPosition(
    //   (position) => {
    //     console.log(position.coords)
    // dispatch(setLocation(position.coords))
    //   },
    //   (error) => {
    //     console.warn(error)
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     distanceFilter: 10,
    //     forceRequestLocation: true,
    //     showLocationDialog: true,
    //   },
    // )
  }, [])

  return (
    <>
      <MapView
        style={ROOT}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        initialRegion={{
          latitude: 24.942114588644632,
          longitude: 67.07928649736084,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        toolbarEnabled={false}
        ref={(map) => {
          setMap(map)
        }}
      >
        <Marker
          title="Your Location"
          coordinate={{
            latitude: bikes[0].lat || 24.942114588644632,
            longitude: bikes[0].lng || 67.07928649736084,
          }}
        >
          <Image style={imageStyle} source={require("./BikeMarker.png")} />
        </Marker>
      </MapView>
      <Button
        onPress={() => {
          navigation.goBack()
        }}
        style={buttonStyle2}
      >
        <View style={[searchStyle1, { padding: 10, borderRadius: 10 }]}>
          <MaterialIcons color={color.appcolor} size={30} name="arrow-back" />
        </View>
      </Button>
      <Button
        onPress={() => {
          map.animateToRegion({
            latitude: bikes[0].lat,
            longitude: bikes[0].lng,
            latitudeDelta: 0.002,
            longitudeDelta: 0.001,
          })
        }}
        style={buttonStyle1}
      >
        <View style={searchStyle1}>
          <MaterialIcons color={color.appcolor} size={20} name="my-location" />
        </View>
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("SearchScreen")
        }}
        style={buttonStyle}
      >
        <View style={searchStyle}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              size={20}
              style={{ paddingRight: 10, color: `${color.appcolor}` }}
              name="ios-search-outline"
            />
            <Text text="Search" style={{ color: `${color.appcolor}` }} />
          </View>
        </View>
      </Button>
    </>
  )
}
