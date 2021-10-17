import React, { FC } from "react"
import { ToastAndroid, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Input } from "react-native-elements"
import { AuthParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Controller, useForm } from "react-hook-form"
import { validate } from "../../utils/validate"
import auth from '@react-native-firebase/auth'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
}

export const LoginScreen: FC<StackScreenProps<AuthParamList, "login">> =
  ({ navigation }) => {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid, isSubmitted, isSubmitting, submitCount, isValidating },
    } = useForm({
      defaultValues: {
        email: "",
        password: ""
      },
    })

    const onSubmit = async (data) => {
      console.log(data)
      try {
        await auth().signInWithEmailAndPassword(data.email, data.password)
      } catch (e) {
        console.log(e.message)
        ToastAndroid.show(
          e.message,
          ToastAndroid.LONG,
        )
      }
    }

    const onError = (data) => {
      console.log(data)
    }

    return (
      <Screen style={ROOT} preset="scroll">
        <View>
          <Controller
            name={"email"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Email is Required",
              },
              validate: value => {
                const val = validate({
                  email: {
                    email: { message: "Not a valid email address" },
                  },
                }, { email: value })
                if (val.email) {
                  return val.email[0]
                }
                return null
              },
            }}
            render={({ field, fieldState }) =>
              <Input
                label={"Email"}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                renderErrorMessage={fieldState.isTouched && Boolean(fieldState.error?.message)}
                errorMessage={fieldState.error?.message}
                textAlign={undefined}
              />
            }
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
            render={({ field, fieldState }) =>
              <Input
                label={"Password"}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                renderErrorMessage={fieldState.isTouched && Boolean(fieldState.error?.message)}
                errorMessage={fieldState.error?.message}
                secureTextEntry={true}
                textAlign={undefined}
              />
            }
          />
          <Text text={JSON.stringify(errors, null, 2)} />
          <Text text={JSON.stringify({ isSubmitted, isSubmitting, submitCount, isValidating, isValid }, null, 2)} />
          <Button
            text={"LogIn"}
            // type={"submit"}
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit, onError)}
          />
        </View>
      </Screen>
    )
  }
