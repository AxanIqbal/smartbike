import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { actionTypes as rrfActionTypes, firebaseReducer, getFirebase } from "react-redux-firebase"
// import { Reactotron } from "../services/reactotron"

const reducer = combineReducers({
  firebase: firebaseReducer,
})

export const mainStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rrfActionTypes).map((type) => `@@reactReduxFirebase/${type}`),
        ],
        ignoredPaths: ["firebase"],
      },
      thunk: { extraArgument: { getFirebase } },
    }),
  // enhancers: Reactotron.call('Reactotron.createEnhancer()')
})
