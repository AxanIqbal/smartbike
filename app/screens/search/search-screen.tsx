import { StackScreenProps } from "@react-navigation/stack"
import React, { FC, useEffect, useState } from "react"
import {
  Image,
  Platform,
  ImageStyle,
  KeyboardAvoidingView,
  SafeAreaView,
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
} from "react-native"
import { Header } from "react-native-elements"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Button, PlaceRow, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import Ionicons from "react-native-vector-icons/Ionicons"
import { color } from "../../theme"
import { DistanceScreen } from "../distance/distance-screen"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"

// const ROOT: ViewStyle = {
//   backgroundColor: color.palette.black,
//   flex: 1,
// }

const container: ViewStyle = {
  marginVertical: 10,
  padding: 10,
  height: "62%",
}

const textInputStyle: TextStyle = {
  padding: 10,
  backgroundColor: "#ffff",
  marginVertical: 5,
  marginLeft: 20,
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 5,
  // borderRadius:20,
  borderTopRightRadius: 25,
  borderBottomLeftRadius: 25,
  // borderBottomLeftRadius: 10,
}

const googleContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 10,
  right: 10,
}

const HeaderStyle: ViewStyle = {
  backgroundColor: color.appcolor,
  justifyContent: "space-around",
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 5,
}

const headerButton: ViewStyle = {
  backgroundColor: "transparent",
}

const listViewStyle: ViewStyle = {
  position: "absolute",
  top: 113,
}

const seperatorStyle: ViewStyle = {
  backgroundColor: color.palette.lighterGrey,
  height: 1,
  width: "90%",
  alignSelf: "center",
}

const circle: ViewStyle = {
  width: 5,
  height: 5,
  backgroundColor: "black",
  position: "absolute",
  top: 27,
  left: 15,
  borderRadius: 5,
}

const line: ViewStyle = {
  width: 1,
  height: 53,
  backgroundColor: color.palette.lightGrey,
  position: "absolute",
  top: 31.5,
  left: 17,
}

const square: ViewStyle = {
  width: 5,
  height: 5,
  backgroundColor: "black",
  position: "absolute",
  top: 80,
  left: 15,
}

const Textstyle: TextStyle = {
  fontSize: 20,
  marginTop: 10,
  color: "#ffff",
}

const searchStyle: ViewStyle = {
  backgroundColor: color.palette.white,
  width: "90%",
  shadowRadius: 0.27,
  elevation: 2,
  // padding: 20,
  height: 60,
  borderRadius: 80,
  alignSelf: "center",
  borderColor: color.appcolor,
  borderWidth: 1,
  bottom: -50,
}

const ROOT: ViewStyle = {
  flex: 1,
  borderRadius: 20,
  overflow: "hidden",
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
  height: "85%",
  width: "95%",
  margin: 10,
  borderWidth: 1,
  borderColor: color.palette.white,
  borderRadius: 20,
  overflow: "hidden",
  bottom: -150,
  position: "absolute",
}

const KeyBoardStyle: ViewStyle = { flex: 1, backgroundColor: "white" }

const origin = { latitude: 24.859142640646972, longitude: 67.03130068682259 }
const destination = { latitude: 24.89536668796498, longitude: 67.06446083144998 }
const GOOGLE_MAPS_APIKEY = "AIzaSyDEXI0NflTOvRTBLOpA8w5zG7ZzHww_YtU"

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "SearchScreen">> = ({
  navigation,
}) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [originPlace, setOriginPlace] = useState(null)
  const [destinationPlace, setDestinationPlace] = useState(null)
  const [map, setMap] = useState(null)
  const [disabled, setDisabled] = useState(true)

  console.log(originPlace?.details, "==> origin", destinationPlace, "==>destination")

  useEffect(() => {
    if (originPlace && destinationPlace) {
      setDisabled(false)
    }
  }, [originPlace, destinationPlace])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={KeyBoardStyle}
    >
      <View style={{ backgroundColor: color.palette.white }}>
        <Header
          leftComponent={
            <Button style={headerButton} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons color="#ffff" name="arrow-left" size={25} />
            </Button>
          }
          centerComponent={<Text style={Textstyle}>Search Place</Text>}
          // rightComponent={
          //   <Button style={headerButton} onPress={() => navigation.navigate("MapsScreen")}>
          //     <MaterialCommunityIcons color="#ffff" name="bike" size={25} />
          //   </Button>
          // }
          containerStyle={HeaderStyle}
          backgroundColor={color.appcolor}
        />
        <View style={container}>
          <GooglePlacesAutocomplete
            placeholder="Where from?"
            onPress={(data, details = null) => {
              setOriginPlace({ data, details })
              map.animateToRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.002,
                longitudeDelta: 0.001,
              })
            }}
            suppressDefaultStyles
            styles={{
              textInput: textInputStyle,
              container: googleContainer,
              listView: listViewStyle,
              separator: seperatorStyle,
            }}
            enablePoweredByContainer={false}
            fetchDetails
            query={{
              key: "AIzaSyDEXI0NflTOvRTBLOpA8w5zG7ZzHww_YtU",
              language: "en",
            }}
            renderRow={(data) => <PlaceRow data={data} />}
          />
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            onPress={(data, details = null) => {
              setDestinationPlace({ data, details })
              map.animateToRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.002,
                longitudeDelta: 0.001,
              })
            }}
            suppressDefaultStyles
            styles={{
              textInput: textInputStyle,
              container: {
                ...googleContainer,
                top: 55,
              },
              separator: seperatorStyle,
            }}
            numberOfLines={1}
            fetchDetails
            enablePoweredByContainer={false}
            query={{
              key: "AIzaSyDEXI0NflTOvRTBLOpA8w5zG7ZzHww_YtU",
              language: "en",
            }}
            renderRow={(data) => <PlaceRow data={data} />}
          />
          {/* Circle design uber maps */}
          <View style={circle} />
          {/* Line */}
          <View style={line} />
          {/* sqaure near destination */}
          <View style={square} />
        </View>
        <View style={MapStyle}>
          <MapView
            style={ROOT}
            provider={PROVIDER_GOOGLE}
            loadingEnabled={true}
            initialRegion={{
              latitude: originPlace?.details
                ? originPlace.details?.geometry.location.lat
                : 24.8591423,
              longitude: originPlace?.details
                ? originPlace.details?.geometry.location.lng
                : 67.0313037,
              latitudeDelta: 1.0922,
              longitudeDelta: 1.0421,
            }}
            ref={(map) => {
              setMap(map)
            }}
          >
            <Marker
              title="Your Bike"
              coordinate={{
                latitude: originPlace?.details ? originPlace.details?.geometry.location.lat : 0,
                longitude: originPlace?.details ? originPlace.details?.geometry.location.lng : 0,
              }}
            >
              <Image style={imageStyle} source={require("../maps/BikeMarker.png")} />
            </Marker>
            <Marker
              title="Your Destination"
              coordinate={{
                latitude: destinationPlace?.details
                  ? destinationPlace.details?.geometry.location.lat
                  : 0,
                longitude: destinationPlace?.details
                  ? destinationPlace.details?.geometry.location.lng
                  : 0,
              }}
            />
          </MapView>
        </View>
      </View>
      <Button
        onPress={() => {
          navigation.navigate("DistanceScreen", {
            destinationLat: destinationPlace.details?.geometry.location.lat,
            destinationLng: destinationPlace.details?.geometry.location.lng,
            originLat: originPlace.details?.geometry.location.lat,
            originLng: originPlace.details?.geometry.location.lng,
          })
        }}
        disabled={disabled}
        style={{
          ...searchStyle,
          borderColor: `${!disabled ? color.appcolor : color.palette.lightGrey}`,
        }}
      >
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Ionicons
            color={!disabled ? color.appcolor : color.palette.lightGrey}
            size={20}
            style={{ paddingRight: 10 }}
            name="analytics"
          />
          <Text
            text="Show Direction"
            style={{ color: `${!disabled ? color.appcolor : color.palette.lightGrey}` }}
          />
        </View>
      </Button>
    </KeyboardAvoidingView>
  )
}
