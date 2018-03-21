import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import User from './../shared/components/User';
import Constants from './../shared/constants';

class Leaderboard extends Component {
  componentDidMount() {
    // bugfix in react-redux-firebase
    // the watchers have a problem
    // https://github.com/prescottprue/react-redux-firebase/issues/368#issuecomment-357917044
    this.props.firebase.watchEvent('value', `/users`);
  }

  render() {
    let users;
    if (this.props.users) {
      users = Object.values(this.props.users)
        .sort((a, b) => {
          const ratingA = a.value.eloRating || Constants.defaultEloRating;
          const ratingB = b.value.eloRating || Constants.defaultEloRating;
          return ratingA - ratingB;
        })
        .reverse()
        .map(user => {
          user.value.eloRating =
            user.value.eloRating || Constants.defaultEloRating;
          return (
            <User
              online={this.props.presence[user.key]}
              key={user.key}
              uid={user.key}
              user={user.value}
            />
          );
        });
    }
    return <div>{users}</div>;
  }
}

export default compose(
  firebaseConnect(props => [{ path: 'presence' }, { path: '/users' }]),
  connect(({ firebase }) => {
    return {
      presence: firebase.data.presence || {},
      users: firebase.ordered.users,
    };
  })
)(Leaderboard);
