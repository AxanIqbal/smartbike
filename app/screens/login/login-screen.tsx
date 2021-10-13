import { Formik } from "formik"
import React from "react"
import { View, ViewStyle } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useFirebase } from "react-redux-firebase"
import { Button, Input, Text } from "react-native-elements"
import { validate } from "../../utils/validate"
// import { Button } from "react-native-elements"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
}

export const LoginScreen = function LoginScreen() {
  const firebase = useFirebase()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Formik
        initialValues={{
          email: "",
          password: "",
          Firebase: null,
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          console.log(values)
          setSubmitting(true)
          try {
            await firebase.login({ email: values.email, password: values.password })
          } catch (e) {
            console.log(e)
            setFieldError("Firebase", e.message)
            setSubmitting(false)
          }
          setSubmitting(false)
        }}
        validate={values => {
          console.log(values)
          const val = validate({
            email: {
              presence: { message: 'Please Enter your email', allowEmpty: false },
              email: { message: 'Not a valid email address' },
            },
              password: {
                presence: { message: 'Please Enter your password', allowEmpty: false },
                length: {
                  minimum: 3,
                  tooShort: "Password must contain more then 3 Characters",
                },
              }
            },
            values)
          console.log(val)
          return val
        }}
      >
        {({
            values,
            handleChange,
            handleBlur,
            errors,
            isSubmitting,
            touched,
            handleSubmit,
          }) => (
          <View>
            <Input
              label={"Email"}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              renderErrorMessage={touched.email && Boolean(errors.email)}
              errorMessage={errors.email && errors.email}
              textAlign={undefined}
            />
            <Input
              label={"Password"}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              errorMessage={errors.password && errors.password[0]}
              textAlign={undefined}
            />
            {errors.Firebase && <Text>{errors.Firebase}</Text>}
            <Button onPress={()=>handleSubmit()} title={"LogIn"} loading={isSubmitting} />
          </View>
        )}

      </Formik>
    </Screen>
  )
}
