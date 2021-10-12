import React, { FC, useState } from "react"
import { Dimensions, Image, ImageStyle, SafeAreaView, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
import { SearchBar } from "react-native-elements"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

const ROOT: ViewStyle = { width: "100%", height: "90%" }
const blankScreen: ViewStyle = {
  backgroundColor: color.palette.white,
  zIndex: 10,
}
const buttonStyle: ViewStyle = {
  backgroundColor: "transparent",
  height: 90,
  width: "100%",
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

export const MapsScreen: FC<StackScreenProps<NavigatorParamList, "MapsScreen">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [text, setText] = useState("")
    const updateSearch = (input) => {
      console.log(input)
      setText(input)
    }
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <>
        <MapView
          style={ROOT}
          provider={PROVIDER_GOOGLE}
          loadingEnabled={true}
          initialRegion={{
            latitude: 24.859142640646972,
            longitude: 67.03130068682259,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            title="Your Location"
            coordinate={{
              latitude: 24.859142640646972,
              longitude: 67.03130068682259,
            }}
          >
            <Image style={imageStyle} source={require("./BikeMarker.png")} />
          </Marker>
        </MapView>
          <Button onPress={()=>{navigation.navigate('SearchScreen')}} style={buttonStyle}>
            <SearchBar
              lightTheme={true}
              containerStyle={fieldStyle}
              inputContainerStyle={{ backgroundColor: "transparent", marginTop: -9 }}
              placeholder="Search..."
              onChangeText={updateSearch}
              value={text}
            />
          </Button>
      </>
    )
  },
)
