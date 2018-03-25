import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import User from './../shared/components/User';
import EnrichCompetitors from './../shared/components/EnrichCompetitors';

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
        .sort((a, b) => -(a.eloRating - b.eloRating))
        .map(user => {
          return <User key={user.uid} user={user} />;
        });
    }
    return <div>{users}</div>;
  }
}

export const LeaderboardTest = Leaderboard;

export default compose(
  firebaseConnect(props => [{ path: '/users' }]),
  connect(({ firebase }) => {
    return {
      users: firebase.ordered.users,
    };
  })
)(EnrichCompetitors(Leaderboard));
