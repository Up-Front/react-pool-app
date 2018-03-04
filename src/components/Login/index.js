import React from 'react';
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import Lottie from 'react-lottie';
import * as animationData from "../../pool";
import styled from 'styled-components'
import {FadeIn} from 'animate-css-styled-components';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData
};

const Login = styled.div`
  display:flex;
  flex-direction: column;
  justify-items: center;
  align-items:center;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 12px 12px;
  margin:10px;
  font-size: 120%;
  cursor: pointer;
  border: 0 none;
  border-radius: 4px;
  color: black;
  background: rgba(255,255,255,0.5);

  :hover {
    background-color: #517fa4;
    transition: all 150ms linear;
  }
`;

export const LoginPage = ({firebase, auth}) => {
  return (
    <div>
      <Login>
        {isLoaded(auth) && isEmpty(auth)
          ? <Button
            onClick={() => firebase.login({provider: 'google', type: 'popup'})}
          >
            Log in
          </Button>
          :
          <Button
            onClick={() => firebase.logout()}
          >
            Log out
          </Button>
        }
        {
          isLoaded(auth) && isEmpty(auth)
            ? null
            : <FadeIn delay='0.5s'><span>Welcome, </span><strong>{auth.displayName}</strong></FadeIn>
        }

      </Login>
      <Lottie options={defaultOptions}/>
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
