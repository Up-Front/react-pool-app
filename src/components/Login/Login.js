import React from 'react';
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import Lottie from 'react-lottie';
import * as animationData from "../../pool";
import styled from 'styled-components'
import {FadeIn} from 'animate-css-styled-components';
import GoogleButton from 'react-google-button';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
};

const Login = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  padding-top: 10px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 14px;
  font-size: 100%;
  margin-bottom: 10px;
  cursor: pointer;
  border: 0 none;
  color: white;
  background-color: rgb(66,133,244);
`;

export const LoginPage = ({firebase, auth}) => {
  const isLoggedIn = !isEmpty(auth);

  const loginWithPopup = () => {
    firebase.login({
      provider: 'google',
      type: 'popup',
    })
  };

  let button;
  let welcomeMessage;
  if (isLoggedIn) {
    button = <Button onClick={firebase.logout}>Sign out</Button>;
    welcomeMessage =
      <FadeIn delay='0.5s'>
        <span>Currently logged in as </span>
        <strong>{auth.displayName}</strong>
      </FadeIn>
  } else {
    button = <GoogleButton onClick={loginWithPopup}/>;
  }

  return (
    <div>
      {isLoaded(auth) && <Login>{button}{welcomeMessage}</Login>}
      <Lottie width={600} options={defaultOptions}/>
    </div>
  )
};

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object
};

export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => ({auth}))
)(LoginPage)
