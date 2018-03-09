import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const Authorization = Component => {
    const BaseAuth = ({ auth, ...props }) => {
        if (isLoaded(auth) && !isEmpty(auth)) {
            return <Component auth={auth} {...props} />
        } else if (isLoaded(auth) && isEmpty(auth)) {
            return <Redirect to="/login" push />;
        }
        return null;
    }
    return compose(
        firebaseConnect((props) => [
            { path: 'auth' },
        ]),
        connect(({ firebase }) => ({
            auth: firebase.auth,
        }))
    )(BaseAuth);
}

export default Authorization;
