import { configureStore } from "@reduxjs/toolkit"
import {
  actionTypes as rrfActionTypes,
  FirebaseReducer,
  firebaseReducer,
  getFirebase,
} from "react-redux-firebase"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import LocationState from "./slices/location_slices"
import { DBSchema, UserProfile } from "./slices/firebase.types"

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    location: LocationState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          // FLUSH,
          // REHYDRATE,
          // PAUSE,
          // PERSIST,
          // PURGE,
          // REGISTER,
          ...Object.keys(rrfActionTypes).map((type) => `@@reactReduxFirebase/${type}`),
        ],
        ignoredPaths: ["firebase"],
      },
      thunk: { extraArgument: { getFirebase } },
    }),
  // enhancers: Reactotron.call('Reactotron.createEnhancer()')
})

// export interface RootState {
//   firebase: FirebaseReducer.Reducer<Profile, Schema>
//   location: typeof LocationState
// }

export interface RootStateAlter {
  firebase: FirebaseReducer.Reducer<UserProfile, DBSchema>
  location: ReturnType<typeof LocationState>
}
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {firebase: firebaseState }
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStateAlter> = useSelector
