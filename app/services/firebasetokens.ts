export async function saveTokenToDatabase(token: string, updateProfile) {
  updateProfile({
    token: token,
  })
}
