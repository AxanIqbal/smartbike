// import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import { actionTypes as rrfActionTypes, firebaseReducer, getFirebase } from "react-redux-firebase"
// import { useDispatch } from "react-redux"
// import LocationState from "./slices/location_slices"
// import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// // import { Reactotron } from "../services/reactotron"
//
// const reducer = combineReducers({
//   firebase: firebaseReducer,
//   location: LocationState,
// })
//
// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   whitelist: ["location"],
// }
//
// const persistedReducer = persistReducer(persistConfig, reducer)
//
//
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           // just ignore every redux-firebase and react-redux-firebase action type
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,
//           ...Object.keys(rrfActionTypes).map((type) => `@@reactReduxFirebase/${type}`),
//         ],
//         ignoredPaths: ["firebase"],
//       },
//       thunk: { extraArgument: { getFirebase } },
//     }),
//   // enhancers: Reactotron.call('Reactotron.createEnhancer()')
// })
//
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {firebase: firebaseState }
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
