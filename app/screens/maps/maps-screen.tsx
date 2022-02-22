import React, { FC, useState } from "react"
import { Dimensions, Image, ImageStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { StackScreenProps } from "@react-navigation/stack"
import * as Location from "expo-location"
import { LocationAccuracy } from "expo-location"
import { useFirebase } from "react-redux-firebase"
import { setLocation } from "../../store/slices"

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
  bottom: Dimensions.get("screen").height * 0.9,
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
  const firebase = useFirebase()
  const dispatch = useAppDispatch()
  const [map, setMap] = useState(null)
  const location = useAppSelector((state) => state.location)
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
    let subsLoc: Location.LocationSubscription
    ;(async () => {
      subsLoc = await Location.watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
        },
        (location) => {
          // console.log(location)
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
            latitude: location.latitude || 24.942114588644632,
            longitude: location.longitude || 67.07928649736084,
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
            latitude: location.latitude,
            longitude: location.longitude,
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
