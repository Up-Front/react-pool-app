import { createStore, compose } from 'redux';
import rootReducer from './reducer';
import firebase from 'firebase';
import config from './config';
import { reactReduxFirebase } from 'react-redux-firebase';

firebase.initializeApp(config);
export const database = firebase.database();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      reactReduxFirebase(firebase, {
        userProfile: 'users',
        presence: 'presence', // where list of online users is stored in database
        sessions: 'sessions',
      }),
      // Redux Devtools
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
    )
  );
  return store;
}
