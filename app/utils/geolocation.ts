import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from "react-native"
import Geolocation from "react-native-geolocation-service"
import appConfig from "../../app.json"


export const watchCurrentLocation = async () => {
  await hasLocationPermission()

  // const dispatch = useAppDispatch()
  // console.log(hasPermission)
  // if (!hasPermission) {
  //   return null
  // }

  // return Geolocation.watchPosition(position => {
  //   console.log(position.coords)
  //   dispatch(setLocation(position.coords))
  // },error => {
  //   console.warn(error)
  // },{
  //   enableHighAccuracy: true,
  //   distanceFilter: 0,
  //   forceRequestLocation: true,
  //   showLocationDialog: true,
  // })

  return new Promise((resolve: Geolocation.SuccessCallback, reject: Geolocation.ErrorCallback) =>
    Geolocation.watchPosition(resolve, reject, {
      enableHighAccuracy: false,
      distanceFilter: 0,
      forceRequestLocation: true,
      showLocationDialog: true,
    }),
  )
}

export const getCurrentLocation = async () => {
  const hasPermission = await hasLocationPermission()

  console.log("has permission?", hasPermission)

  // if (!hasPermission) {
  //   return null
  // }

  return new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, {
      accuracy: {
        android: "high",
        ios: "best",
      },
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 0,
      forceRequestLocation: true,
      showLocationDialog: true,
    }),
  )
}

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert("Unable to open settings")
    })
  }
  const status = await Geolocation.requestAuthorization("whenInUse")

  if (status === "granted") {
    return true
  }

  if (status === "denied") {
    Alert.alert("Location permission denied")
  }

  if (status === "disabled") {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.expo.name}" to determine your location.`,
      "",
      [
        { text: "Go to Settings", onPress: openSetting },
        {
          text: "Don't Use Location",
          onPress: () => {
            return null
          },
        },
      ],
    )
  }

  return false
}

const hasLocationPermission = async () => {
  if (Platform.OS === "ios") {
    return await hasPermissionIOS()
  }

  if (Platform.OS === "android" && Platform.Version < 23) {
    return true
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show("Location permission denied by user.", ToastAndroid.LONG)
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      "Location permission revoked by user.",
      ToastAndroid.LONG,
    )
  }
  console.log(status)
  return false
}
