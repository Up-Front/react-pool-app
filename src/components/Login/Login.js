import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Login, Button, LoginWrapper } from './styles';
import { loginUser } from './../../actions/auth';


const LoginPage = ({ auth }) => {
  if (isLoaded(auth) && !isEmpty(auth)) return <Redirect to="/" push />;

  return (
    <LoginWrapper>
      <Login>
        <Button onClick={loginUser}>Log in</Button>
      </Login>
    </LoginWrapper>
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
