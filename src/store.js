import {createStore, compose} from 'redux'
import rootReducer from './reducer'
import firebase from 'firebase'
import config from './config'
import {reactReduxFirebase} from 'react-redux-firebase'

firebase.initializeApp(config);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      reactReduxFirebase(firebase, {
        userProfile: 'users',
      }),
    )
  )
  return store;
}
