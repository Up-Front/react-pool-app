import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import User from './../shared/components/User';
import EnrichCompetitors from './../shared/components/EnrichCompetitors';

class Leaderboard extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    // bugfix in react-redux-firebase
    // the watchers have a problem
    // https://github.com/prescottprue/react-redux-firebase/issues/368#issuecomment-357917044
    this.props.firebase.watchEvent('value', `/users`);
  }

  render() {
    let users;
    if (this.props.users instanceof Array) {
      users = this.props.users
        .sort(
          (a, b) => -(a.currentRanking.eloRating - b.currentRanking.eloRating)
        )
        .map((user, key) => {
          return <User key={user.uid} user={user} />;
        });
    }
    return <div>{users}</div>;
  }
}

export const LeaderboardTest = Leaderboard;

export default compose(
  firebaseConnect(props => [
    { path: '/users' },
    {
      path: 'rankings',
      queryParams: ['orderByKey', 'limitToLast=2'],
    },
  ]),
  connect(({ firebase }) => {
    return {
      users: firebase.ordered.users,
      rankings: firebase.ordered.rankings,
    };
  })
)(EnrichCompetitors(Leaderboard));
