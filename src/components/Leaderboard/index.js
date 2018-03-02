import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { UserList, User } from '../UserList'

const Leaderboard = ({ firesbase, users, matches, presence }) => {
  return (
    <div>
      <UserList>
        {users && users.map(({ key, value: user }) => (<User online={presence[key]} key={key} {...user} />))}
      </UserList>
    </div>
  )
};

export default compose(
  firebaseConnect((props) => [
    { path: 'presence' },
    { path: 'users' },
    { path: 'matches' },

  ]),
  connect((state, props) => ({
    presence: state.firebase.data.presence || {},
    users: state.firebase.ordered.users,
    matches: state.firebase.ordered.matches
  }))
)(Leaderboard)