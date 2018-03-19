import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Lottie from 'react-lottie';
import * as animationData from '../../pool';
import { Login, Button } from './styles';
import { loginUser } from './../../actions/auth';

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
};

const LoginPage = ({ auth }) => {
  if (isLoaded(auth) && !isEmpty(auth)) return <Redirect to="/" push />;

  return (
    <div>
      <Login>
        <Button onClick={loginUser}>Log in</Button>
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
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage);
