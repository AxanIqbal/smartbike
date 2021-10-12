import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import { Dimensions, Image, SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
import { Header } from "react-native-elements"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Button, PlaceRow, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const container: ViewStyle = {
  marginTop: 20,
  padding: 10,
  height: "100%",
}

const textInputStyle: TextStyle = {
  padding: 10,
  backgroundColor: "#dddddded",
  marginVertical: 5,
  marginLeft: 20,
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
}

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "SearchScreen">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [originPlace, setOriginPlace] = useState(null)
    const [destinationPlace, setDestinationPlace] = useState(null)

    useEffect(() => {
      if (originPlace && destinationPlace) {
        console.log("lol")
      }
    }, [originPlace, destinationPlace])
    return (
      <View>
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
        <SafeAreaView>
          <View style={container}>
            <GooglePlacesAutocomplete
              placeholder="Where from?"
              onPress={(data, details = null) => {
                setOriginPlace({ data, details })
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
        </SafeAreaView>
      </View>
    )
  },
)
