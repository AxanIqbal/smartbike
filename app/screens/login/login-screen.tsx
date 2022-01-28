import React, { FC, useState } from "react"
import { Dimensions, Image, ImageStyle, TextStyle, ToastAndroid, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Input } from "react-native-elements"
import { AuthParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Controller, useForm } from "react-hook-form"
import { validate } from "../../utils/validate"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"
import auth from "@react-native-firebase/auth"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
}

const ButtonStyle: ViewStyle = {
  backgroundColor: color.appcolor,
  width: "30%",
  alignSelf: "center",
  marginTop: 20,
  borderRadius: 10,
}

const ButtonTextStyle: TextStyle = {
  color: color.palette.white,
  fontSize: 15,
}

const iconStyle: ViewStyle = {
  backgroundColor: "transparent",
  borderBottomColor: "black",
  borderBottomWidth: 1,
}

const imageStyle: ImageStyle = {
  width: Dimensions.get("screen").width * 0.8,
  height: Dimensions.get("screen").height * 0.3,
  alignSelf: "center",
  marginTop: -75,
}

const headingStyle: TextStyle = {
  alignSelf: "center",
  fontSize: 30,
  color: color.appcolor,
  fontWeight: "700",
}

const signUpStyle: ViewStyle = {
  alignSelf: "center",
  flexDirection: "row",
}

const iconStyles: ViewStyle = {
  backgroundColor: color.appcolor,
  marginHorizontal: 10,
  borderRadius: 100,
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 5,
}

const icons: ViewStyle = {
  padding: 6,
}

export const LoginScreen: FC<StackScreenProps<AuthParamList, "login">> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await auth().signInWithEmailAndPassword(data.email, data.password)
    } catch (e) {
      console.log(e.message)
      ToastAndroid.show(e.message, ToastAndroid.LONG)
    }
  }

  const [visible, setVisible] = useState(true)
  const [visibility, setVisibility] = useState("eye-off")

  const onError = (data) => {
    console.log(data)
  }

  const changeVisible = () => {
    if (visibility === "eye") {
      setVisibility("eye-off")
      setVisible(true)
    } else {
      setVisibility("eye")
      setVisible(false)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View>
        <Image source={require("../maps/BikeMarker.png")} style={imageStyle} />
        <Text style={headingStyle}>Smart Electric Bike</Text>
        <Controller
          name={"email"}
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Email is Required",
            },
            validate: (value) => {
              const val = validate(
                {
                  email: {
                    email: { message: "Not a valid email address" },
                  },
                },
                { email: value },
              )
              if (val.email) {
                return val.email[0]
              }
              return null
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              label={"Email"}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              renderErrorMessage={fieldState.isTouched && Boolean(fieldState.error?.message)}
              errorMessage={fieldState.error?.message}
              textAlign={undefined}
            />
          )}
        />
        <Controller
          name={"password"}
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Password is Required",
            },
            minLength: {
              value: 3,
              message: "Enter more then 3 Char",
            },
          }}
          render={({ field, fieldState }) => (
            <View style={{ flexDirection: "row", width: "90%" }}>
              <Input
                label={"Password"}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                renderErrorMessage={fieldState.isTouched && Boolean(fieldState.error?.message)}
                errorMessage={fieldState.error?.message}
                secureTextEntry={visible}
                textAlign={undefined}
              />
              <Button onPress={changeVisible} style={iconStyle}>
                <Ionicons size={20} name={visibility} />
              </Button>
            </View>
          )}
        />
        <Button
          style={ButtonStyle}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit, onError)}
        >
          <Text style={ButtonTextStyle} text="Login" />
        </Button>
        <View style={{ alignSelf: "center", marginVertical: 15 }}>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <Text style={{ textAlign: "center" }}>Sign In With</Text>
        </View>
      </View>
      <View style={signUpStyle}>
        <Button style={iconStyles}>
          <MaterialIcons style={icons} size={25} color="white" name="facebook" />
        </Button>
        <Button style={iconStyles}>
          <MaterialIcons style={icons} size={25} color="white" name="google" />
        </Button>
        <Button style={iconStyles}>
          <MaterialIcons style={icons} size={25} color="white" name="email-open" />
        </Button>
      </View>
    </Screen>
  )
}
