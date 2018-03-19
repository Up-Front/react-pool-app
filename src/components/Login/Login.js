import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Lottie from 'react-lottie';
import * as animationData from '../../pool';
import { Login, Button } from './styles';

import { FadeIn } from 'animate-css-styled-components';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
};

const LoginPage = ({ firebase, auth }) => {
  const isLoggedIn = isLoaded(auth) && !isEmpty(auth);
  let button;
  let welcomeMessage;

  if (isLoggedIn) {
    button = <Button onClick={() => firebase.logout()}>Log out</Button>;
    welcomeMessage = (
      <FadeIn delay="0.5s">
        <span>Welcome, </span>
        <strong>{auth.displayName}</strong>
      </FadeIn>
    );
  } else {
    button = (
      <Button
        onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
      >
        Log in
      </Button>
    );
    welcomeMessage = <div>You are not logged in</div>;
  }

  return (
    <div>
      <Login>
        {button}
        {welcomeMessage}
      </Login>
      <Lottie options={defaultOptions} />
    </div>
  );
};

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage);
