import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootStateAlter } from "../store"

// interface LocationState {
//   latitude: number,
//   longitude: number
// }

const initialState = {
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  altitude: undefined,
  altitudeAccuracy: undefined,
  heading: undefined,
  speed: undefined,
}

const locationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<any>) => {
      state = action.payload
      // console.log(state, action.payload)
      return state
    },
  },
})

export const { setLocation } = locationSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectCords = (state: RootStateAlter) => state.location

export default locationSlice.reducer
