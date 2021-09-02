import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  actionTypes as rrfActionTypes,
  firebaseReducer,
  getFirebase,
} from 'react-redux-firebase';
import {constants as rfConstants, firestoreReducer} from 'redux-firestore';

const reducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rfConstants.actionTypes).map(
            type => `${rfConstants.actionsPrefix}/${type}`,
          ),
          ...Object.keys(rrfActionTypes).map(
            type => `@@reactReduxFirebase/${type}`,
          ),
        ],
        ignoredPaths: ['firebase', 'firestore'],
      },
      thunk: {extraArgument: {getFirebase}},
    }),
});
