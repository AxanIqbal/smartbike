import React, { FC } from "react"
import { Dimensions, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import * as Yup from "yup"
import { Formik } from "formik"
import { HelperText, TextInput } from "react-native-paper"

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

const LogInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm password is required"),
  bikeId: Yup.string().required("Bike id is required"),
})

export const SignupScreen: FC<StackScreenProps<NavigatorParamList, "Signup">> = ({ navigation }) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Image source={require("../maps/BikeMarker.png")} style={imageStyle} />
      <Text style={headingStyle}>Smart Electric Bike</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          bikeId: "",
        }}
        validationSchema={LogInSchema}
        onSubmit={async values => {
          console.log(values)
        }}>
        {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
          }) => (
          <>
            <View
              style={{
                width: Dimensions.get("screen").width,
                paddingHorizontal: 20,
              }}>
              <TextInput
                label={"Email"}
                mode={"outlined"}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: "#ffff",
                  color: "black",
                }}
                placeholder="Enter Your Email..."
                placeholderTextColor="grey"
                error={touched.email && Boolean(errors.email)}
              />
              <HelperText
                type="error"
                visible={
                  touched.email && Boolean(errors.email)
                }>
                {touched.email && errors.email}
              </HelperText>
            </View>
            <View
              style={{
                width: Dimensions.get("screen").width,
                paddingHorizontal: 20,
              }}>
              <TextInput
                label={"Bike Id"}
                mode={"outlined"}
                onChangeText={handleChange("bikeId")}
                onBlur={handleBlur("bikeId")}
                value={values.bikeId}
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: "#ffff",
                  color: "black",
                }}
                placeholder="Enter Your Bike Id..."
                placeholderTextColor="grey"
                error={touched.bikeId && Boolean(errors.bikeId)}
              />
              <HelperText
                type="error"
                visible={
                  touched.bikeId && Boolean(errors.bikeId)
                }>
                {touched.bikeId && errors.bikeId}
              </HelperText>
            </View>
            <View
              style={{
                width: Dimensions.get("screen").width,
                paddingHorizontal: 20,
              }}>
              <TextInput
                label={"Password"}
                mode={"outlined"}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: "#ffff",
                  color: "black",
                }}
                placeholder="Enter Your Password..."
                placeholderTextColor="grey"
                error={touched.password && Boolean(errors.password)}
              />
              <HelperText
                type="error"
                visible={
                  touched.password && Boolean(errors.password)
                }>
                {touched.password && errors.password}
              </HelperText>
            </View>
            <View
              style={{
                width: Dimensions.get("screen").width,
                paddingHorizontal: 20,
              }}>
              <TextInput
                label={"Confirm Password"}
                mode={"outlined"}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: "#ffff",
                  color: "black",
                }}
                placeholder="Confirm Your Password..."
                placeholderTextColor="grey"
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              />
              <HelperText
                type="error"
                visible={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }>
                {touched.confirmPassword && errors.confirmPassword}
              </HelperText>
            </View>
            <Button
            style={{
              marginHorizontal: 20,
              height: 50,
              borderRadius: 5,
            }}
            >
              <Text style={{color: color.palette.white, fontSize: 17,}}>Sign Up</Text>
            </Button>
          </>
        )}
      </Formik>
    </Screen>
  )
}
