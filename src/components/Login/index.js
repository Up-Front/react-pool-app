import React from 'react';
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import Lottie from 'react-lottie';
import * as animationData from "../../pool";
import {get} from 'lodash'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData
};

export const LoginPage = ({firebase, auth}) => {
  return (
    <div>
      {isLoaded(auth) && isEmpty(auth)
        ? <button
          onClick={() => firebase.login({provider: 'google', type: 'popup'})}
        >Login With Google
        </button>
        :
        <button
          onClick={() => firebase.logout()}
        >Log out
        </button>
      }
      <div>
        {
          isLoaded(auth) && isEmpty(auth)
            ? <span>You are not logged in</span>
            : <span>Logged in as {auth.displayName}</span>
        }
      </div>
      <Lottie options={defaultOptions} />
    </div>
  )
};

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({firebase: {auth}}) => ({auth}))
)(LoginPage)
