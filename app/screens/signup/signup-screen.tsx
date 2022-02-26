import React, { FC, useCallback } from "react"
import { Dimensions, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AuthParamList } from "../../navigators"
import { Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import * as Yup from "yup"
import { Controller, useForm } from "react-hook-form"
import { HelperText, TextInput } from "react-native-paper"
import { useFirebase } from "react-redux-firebase"
import database from "@react-native-firebase/database"
import { Bike } from "../../store/slices/firebase.types"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const imageStyle: ImageStyle = {
  width: Dimensions.get("screen").width * 0.8,
  height: Dimensions.get("screen").height * 0.3,
  alignSelf: "center",
}

const headingStyle: TextStyle = {
  alignSelf: "center",
  fontSize: 30,
  color: color.appcolor,
  fontWeight: "700",
}

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {},
          ),
        }
      }
    },
    [validationSchema],
  )

const LogInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  bikeId: Yup.string()
    .required("Bike id is required")
    .test("bike_async_validation", "Bike Validation Error", function (value) {
      return database()
        .ref("/bikes")
        .once("value")
        .then((value1) => {
          const bikeList: Record<string, Bike> = value1.val()
          if (bikeList[value] === undefined) {
            return this.createError({ message: "Bike not found" })
          }
          if (bikeList[value].owner !== undefined) {
            return this.createError({ message: "Bike already have an owner" })
          }
          return true
        })
    }),
})

interface LogInTypes {
  email: string
  password: string
  confirmPassword: string
  bikeId: string
}

export const SignupScreen: FC<StackScreenProps<AuthParamList, "signUp">> = () => {
  const resolver = useYupValidationResolver(LogInSchema)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LogInTypes>({ resolver })
  const firebase = useFirebase()

  const onSubmit = (data: LogInTypes) =>
    firebase
      .createUser(
        { email: data.email, password: data.password, signIn: false },
        { bikes: [data.bikeId] },
      )
      .then((value) => firebase.update("/bikes/" + data.bikeId, { owner: value.uid }))

  const onError = (error) => {
    console.log(error)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Image source={require("../maps/BikeMarker.png")} style={imageStyle} />
      <Text style={headingStyle}>Smart Electric Bike</Text>

      <Controller
        name={"email"}
        control={control}
        render={({ field, fieldState, formState }) => (
          <View
            style={{
              width: Dimensions.get("screen").width,
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              label={"Email"}
              mode={"outlined"}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#ffff",
                color: "black",
              }}
              placeholder="Enter Your Email..."
              placeholderTextColor="grey"
              error={fieldState.isTouched && Boolean(fieldState.error?.message)}
            />
            <HelperText
              type="error"
              visible={fieldState.isTouched && Boolean(fieldState.error?.message)}
            >
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <Controller
        name={"bikeId"}
        control={control}
        render={({ field, fieldState, formState }) => (
          <View
            style={{
              width: Dimensions.get("screen").width,
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              label={"Bike ID"}
              mode={"outlined"}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#ffff",
                color: "black",
              }}
              placeholder="Enter Your Bike ID..."
              placeholderTextColor="grey"
              error={fieldState.isTouched && Boolean(fieldState.error?.message)}
            />
            <HelperText
              type="error"
              visible={fieldState.isTouched && Boolean(fieldState.error?.message)}
            >
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <Controller
        name={"password"}
        control={control}
        render={({ field, fieldState, formState }) => (
          <View
            style={{
              width: Dimensions.get("screen").width,
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              label={"password"}
              mode={"outlined"}
              secureTextEntry
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#ffff",
                color: "black",
              }}
              placeholder="Enter Your Password..."
              placeholderTextColor="grey"
              error={fieldState.isTouched && Boolean(fieldState.error?.message)}
            />
            <HelperText
              type="error"
              visible={fieldState.isTouched && Boolean(fieldState.error?.message)}
            >
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <Controller
        name={"confirmPassword"}
        control={control}
        render={({ field, fieldState, formState }) => (
          <View
            style={{
              width: Dimensions.get("screen").width,
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              label={"Confirm Password"}
              mode={"outlined"}
              secureTextEntry
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#ffff",
                color: "black",
              }}
              placeholder="Confirm Your Password..."
              placeholderTextColor="grey"
              error={fieldState.isTouched && Boolean(fieldState.error?.message)}
            />
            <HelperText
              type="error"
              visible={fieldState.isTouched && Boolean(fieldState.error?.message)}
            >
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <Button
        style={{
          marginHorizontal: 20,
          height: 50,
          borderRadius: 5,
        }}
        onPress={handleSubmit(onSubmit, onError)}
        disabled={isSubmitting}
      >
        <Text style={{ color: color.palette.white, fontSize: 17 }}>Sign Up</Text>
      </Button>
    </Screen>
  )
}
