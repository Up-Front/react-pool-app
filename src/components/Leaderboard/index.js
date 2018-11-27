import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import FlipMove from 'react-flip-move';
import User from './../shared/components/User';
import EnrichCompetitors from './../shared/components/EnrichCompetitors';

class Leaderboard extends Component {
  constructor(props) {
    super();
  }

  render() {
    let users;
    if (this.props.users instanceof Array) {
      users = this.props.users
        .sort((a, b) => -(a.eloRating - b.eloRating))
        .map((user, key) => {
          return <User key={user.uid} user={user} />;
        });
    }
    return (
      <div>
        <FlipMove>{users}</FlipMove>
      </div>
    );
  }
}

export const LeaderboardTest = Leaderboard;

export default compose(
  firebaseConnect(props => [
    { path: '/users' },
    {
      path: '/rankings',
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
