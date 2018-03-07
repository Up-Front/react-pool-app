import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'


const Authorization = (Component) => {
    const BaseAuth = ({ auth }) => {
        if (isLoaded(auth) && !isEmpty(auth)) {
            return <Component auth={auth} />
        } else {
            return 'You are not allowed';
        }
    }
    const enhance = compose(
        firebaseConnect((props) => [
            { path: 'auth' },
        ]),
        connect(({ firebase }) => ({
            auth: firebase.auth,
        }))
    );
    return enhance(BaseAuth);
}

export default Authorization;


