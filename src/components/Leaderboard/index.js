import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import User from './../shared/components/User';

const Leaderboard = ({ scores, users, presence }) => {
  if (scores) scores.reverse();
  return (
    <div>
      {scores &&
        scores.map(({ key, value: score }, position) => (
          <User
            position={position}
            score={score}
            online={presence[key]}
            key={key}
            user={users[key]}
          />
        ))}
    </div>
  );
};

export default compose(
  firebaseConnect(props => [
    { path: 'presence' },
    { path: 'users', queryParams: ['orderByChild=displayName'] },
    { path: 'scores', queryParams: ['orderByValue'] },
  ]),
  connect((state, props) => ({
    presence: state.firebase.data.presence || {},
    users: state.firebase.data.users,
    scores: state.firebase.ordered.scores,
  }))
)(Leaderboard);
