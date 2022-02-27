import notifee from "@notifee/react-native"

export async function saveTokenToDatabase(token: string, updateProfile) {
  updateProfile({
    token: token,
  })
}

export async function onMessageReceived(message) {
  console.log(JSON.parse(message.data.notifee))
  try {
    await notifee.displayNotification(JSON.parse(message.data.notifee))
  } catch (e) {
    console.log(e)
  }
}
