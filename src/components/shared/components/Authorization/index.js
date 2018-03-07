import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';


const Authorization = (Component) => {
    const BaseAuth = ({ auth, ...props }) => {
        console.log(auth);
        if (isLoaded(auth) && !isEmpty(auth)) {
            return <Component auth={auth} {...props} />
        } else if (isLoaded(auth) && isEmpty(auth)) {
            props.history.push('/login');
            return null;
        }
        return '';
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


