import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import User from './../shared/components/User';
import Constants from './../shared/constants';

const Leaderboard = props => {
  let users;
  if (isLoaded(props.users) || !isEmpty(props.users)) {
    users = Object.values(props.users)
      .reverse()
      .map(user => {
        user.value.eloRating =
          user.value.eloRating || Constants.defaultEloRating;
        return (
          <User
            online={props.presence[user.key]}
            key={user.key}
            uid={user.key}
            user={user.value}
          />
        );
      });
  }

  return <div>{users}</div>;
};

export default compose(
  firebaseConnect(props => [
    { path: 'presence' },
    { path: 'users', queryParams: ['orderByChild=eloRating'] },
  ]),
  connect((state, props) => ({
    presence: state.firebase.data.presence || {},
    users: state.firebase.ordered.users,
  }))
)(Leaderboard);
