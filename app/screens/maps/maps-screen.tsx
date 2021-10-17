import React, { FC } from "react"
import { Dimensions, Image, ImageStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useSelector } from "react-redux"
import { selectCords, setLocation } from "../../store/slices"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAppDispatch } from "../../store/store"
import Geolocation from "react-native-geolocation-service"
import { watchCurrentLocation } from "../../utils/geolocation"

const ROOT: ViewStyle = { width: "100%", height: "90%" }
const blankScreen: ViewStyle = {
  backgroundColor: color.palette.white,
  zIndex: 10,
}
const buttonStyle: ViewStyle = {
  backgroundColor: color.palette.white,
  height: 90,
  width: "100%",
  borderTopRightRadius: 10,
  borderTopLeftRadius: 80,
}
const fieldStyle: ViewStyle = {
  width: Dimensions.get("screen").width * 0.9,
  marginTop: -10,
  borderRadius: 80,
  shadowOpacity: 0.34,
  backgroundColor: color.palette.white,
  shadowRadius: 0.27,
  elevation: 2,
  height: 50,
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

export const MapsScreen: FC<StackScreenProps<NavigatorParamList, "MapsScreen">> =
  ({ navigation }) => {
    const location = useSelector(selectCords)
    const dispatch = useAppDispatch()
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

    React.useEffect(() => {
      console.log("sub")
      watchCurrentLocation().then(position => {
        dispatch(setLocation(position.coords))
      },reason => {
        console.warn(reason)
      })
      // Geolocation.watchPosition(position => {
      //   console.log(position.coords)
      //   dispatch(setLocation(position.coords))
      // }, error => {
      //   console.warn(error)
      // }, {
      //   enableHighAccuracy: true,
      //   distanceFilter: 0,
      //   forceRequestLocation: true,
      //   showLocationDialog: true,
      // })
    }, [])

    return (
      <>
        <MapView
          style={ROOT}
          provider={PROVIDER_GOOGLE}
          loadingEnabled={true}
          initialRegion={{
            latitude: location.latitude || 24.942114588644632,
            longitude: location.longitude || 67.07928649736084,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          // followsUserLocation={true}
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
        <Button onPress={() => {
          navigation.navigate("SearchScreen")
        }} style={buttonStyle}>
          <View style={searchStyle}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons size={20} style={{ paddingRight: 10 }} name="ios-search-outline" />
              <Text text="Search" style={{ color: `${color.palette.lightGrey}` }} />
            </View>
          </View>
        </Button>
      </>
    )
  }
