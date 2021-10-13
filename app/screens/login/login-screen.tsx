import { Formik } from "formik"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useFirebase } from "react-redux-firebase"
import { Button, Input, Text } from "react-native-elements"
import { validate } from "../../utils/validate"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
// import { Button } from "react-native-elements"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "LoginScreen">> =
  ({ navigation }) => {
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
            await firebase.login({ email: values.email, password: values.password }).then(value => {
              console.log(value,"ybhjhy");
              navigation.navigate('welcome')
            })
          } catch (e) {
            console.log(e)
            setFieldError("Firebase", e.message)
            setSubmitting(false)
          }
          setSubmitting(false)
        }}
        validate={values => validate({
            email: {
              presence: { message: "Please Enter your email", allowEmpty: false },
              email: { message: "Not a valid email address" },
            },
            password: {
              presence: { message: "Please Enter your password", allowEmpty: false },
              length: {
                minimum: 3,
                tooShort: "Password must contain more then 3 Characters",
              },
            },
          },
          values)
        }
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
              disabled={isSubmitting}
            />
            <Input
              label={"Password"}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              renderErrorMessage={touched.password && Boolean(errors.password)}
              errorMessage={errors.password && errors.password[0]}
              textAlign={undefined}
              disabled={isSubmitting}
            />
            {errors.Firebase && <Text>{errors.Firebase}</Text>}
            <Button onPress={handleSubmit} title={"LogIn"} loading={isSubmitting} disabled={isSubmitting} />
          </View>
        )}

      </Formik>
    </Screen>
  )
}
