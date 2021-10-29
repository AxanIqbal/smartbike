import React, { FC } from "react"
import { Image, ImageStyle, ViewStyle } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
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

export const DistanceScreen: FC<StackScreenProps<NavigatorParamList, "DistanceScreen">> = ({
  navigation,
  route: {
    params: { destinationLat, destinationLng, originLat, originLng },
  },
}) => {
  const origin = { latitude: originLat, longitude: originLng }
  const destination = { latitude: destinationLat, longitude: destinationLng }
  const GOOGLE_MAPS_APIKEY = "AIzaSyDEXI0NflTOvRTBLOpA8w5zG7ZzHww_YtU"

  return (
    <Screen style={ROOT} preset="scroll">
      <MapView
        style={ROOT}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
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
    </Screen>
  )
}
