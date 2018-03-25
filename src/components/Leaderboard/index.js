import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import User from './../shared/components/User';
import constants from './../shared/constants';
import { enrichCompetitor } from './../../actions/competitors';

class Leaderboard extends Component {
  componentDidMount() {
    // bugfix in react-redux-firebase
    // the watchers have a problem
    // https://github.com/prescottprue/react-redux-firebase/issues/368#issuecomment-357917044
    this.props.firebase.watchEvent('value', `/users`);
  }

  enrichCompetitorData = competitor => {
    const newCompetitor = competitor.value;
    newCompetitor.uid = competitor.key;
    return enrichCompetitor({
      competitor: newCompetitor,
      presence: this.props.presence,
      rankings: this.props.rankings,
    });
  };

  render() {
    let users;
    if (this.props.users) {
      users = Object.values(this.props.users)
        .sort((a, b) => {
          const ratingA = a.value.eloRating || constants.DEFAULTELORATING;
          const ratingB = b.value.eloRating || constants.DEFAULTELORATING;
          return -(ratingA - ratingB);
        })
        .map(this.enrichCompetitorData)
        .map(user => {
          user.eloRating = user.eloRating || constants.DEFAULTELORATING;
          return <User key={user.uid} user={user} />;
        });
    }
    return <div>{users}</div>;
  }
}

export const LeaderboardTest = Leaderboard;

export default compose(
  firebaseConnect(props => [
    { path: 'presence' },
    { path: '/users' },
    {
      path: 'rankings',
      queryParams: ['orderByKey', 'limitToLast=2'],
    },
  ]),
  connect(({ firebase }) => {
    return {
      presence: firebase.data.presence || {},
      rankings: firebase.ordered.rankings,
      users: firebase.ordered.users,
    };
  })
)(Leaderboard);
