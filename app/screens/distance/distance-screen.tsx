import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, Text, View, ViewStyle } from "react-native"
import { Battery, Button, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { getDistance } from "geolib"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { useAppSelector } from "../../store/store"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { populate, useFirebaseConnect } from "react-redux-firebase"
import { UserProfile } from "../../store/slices/firebase.types"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  flexDirection: "row",
}

const imageStyle: ImageStyle = {
  width: 50,
  height: 50,
  marginTop: 28,
  resizeMode: "contain",
  transform: [
    {
      rotate: "80deg",
    },
  ],
}

const MapStyle: ViewStyle = {
  zIndex: -1,
  height: "95%",
  width: "80%",
  margin: 10,
  borderWidth: 1,
  borderColor: color.palette.white,
  borderRadius: 20,
  overflow: "hidden",
  position: "relative",
}

const infoConatiner: ViewStyle = {
  flexDirection: "column",
  justifyContent: "space-evenly",
  margin: 10,
}

const imageStyle1: ImageStyle = {
  alignItems: "center",
}

const searchStyle1: ViewStyle = {
  backgroundColor: color.palette.white,
  justifyContent: "flex-end",
  shadowRadius: 0.27,
  elevation: 10,
  padding: 20,
  borderRadius: 80,
}

const buttonStyle2: ViewStyle = {
  position: "relative",
  backgroundColor: "transparent",
  alignSelf: "center",
}

const innerContainer: ViewStyle = {
  alignSelf: "center",
}

export const DistanceScreen: FC<StackScreenProps<NavigatorParamList, "DistanceScreen">> = ({
                                                                                             navigation,
                                                                                             route: {
                                                                                               params: {
                                                                                                 destinationLat,
                                                                                                 destinationLng,
                                                                                                 originLat,
                                                                                                 originLng,
                                                                                               },
                                                                                             },
                                                                                           }) => {
  const [distance, setDistance] = useState(null)
  const firebase = useAppSelector((state) => state.firebase)
  useFirebaseConnect([{ path: "bikes" }])
  const populatedProfile: UserProfile = populate(firebase, "profile", [
    { child: "bikes", root: "bikes", keyProp: "id" },
  ])
  const origin = { latitude: originLat, longitude: originLng }
  const destination = { latitude: destinationLat, longitude: destinationLng }
  const GOOGLE_MAPS_APIKEY = "AIzaSyBoPTw9FBO7ZadMxWNHpf84JSMXEw2dsps"

  useEffect(() => {
    const dis = getDistance(
      { latitude: origin.latitude, longitude: origin.longitude },
      { latitude: destination.latitude, longitude: destination.longitude },
    )
    setDistance(dis / 1000)
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={MapStyle}>
        <MapView
          style={ROOT}
          provider={PROVIDER_GOOGLE}
          // loadingEnabled={true}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            title="Your Bike"
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
          >
            <Image style={imageStyle} source={require("../maps/BikeMarker.png")} />
          </Marker>
          <Marker
            title="Your Destination"
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
          />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor={color.appcolor}
          />
        </MapView>
      </View>
      <View style={infoConatiner}>
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
        <View style={innerContainer}>
          <Battery
            style={imageStyle1}
            isCharging={populatedProfile.bikes[0].isCharging}
            percentage={populatedProfile.bikes[0].battery}
            width={50}
            height={100}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>50%</Text>
        </View>
        <View style={innerContainer}>
          <MaterialCommunityIcons style={{ alignSelf: "center" }} name="speedometer-slow" size={50}
                                  color={color.appcolor} />
          <Text style={{ textAlign: "center", fontSize: 20 }}>{Math.round(populatedProfile.bikes[0].speed)}m/s</Text>
        </View>
        <View style={innerContainer}>
          <MaterialCommunityIcons style={{ alignSelf: "center" }} name="motorbike" size={50} color={color.appcolor} />
          {distance && (
            <Text style={{ textAlign: "center", fontSize: 20 }}>{distance} Km</Text>
          )}
        </View>
      </View>
    </Screen>
  )
}
