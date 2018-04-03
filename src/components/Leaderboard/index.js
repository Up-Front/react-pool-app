import React, { Component } from 'react';
import { database } from './../../store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import User from './../shared/components/User';
import EnrichCompetitors from './../shared/components/EnrichCompetitors';
import { ListUser } from './styles';

class Leaderboard extends Component {
  constructor(props) {
    super();
    this.state = {
      users: null,
      prevUsers: [],
      removeAnimationUsers: [],
      addAnimationUsers: [],
    };
  }

  componentDidMount() {
    // bugfix in react-redux-firebase
    // the watchers have a problem
    // https://github.com/prescottprue/react-redux-firebase/issues/368#issuecomment-357917044
    this.props.firebase.watchEvent('value', `/users`);

    this.checkChangedUsers();

    if (this.animationRef) {
      this.animationRef.addEventListener('transitionend', this.animationDone);
    }
  }

  checkChangedUsers = () => {
    const newUsersRef = database.ref('/users');
    newUsersRef.on('child_changed', snapshot => {
      this.enriched = true;
    });
  };

  componentWillUnmount() {
    this.animationRef.removeEventListener('transitionend', this.animationDone);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.users instanceof Array) {
      if (this.enriched) {
        this.enriched = false;
        const removeAnimationUsers = this.props.users.filter(user => {
          const prevUser = this.getPrevUser(user, nextProps.users);
          return this.isChanged(user, prevUser);
        });
        this.setState({
          prevUsers: this.props.users,
          nextUsers: nextProps.users,
          removeAnimationUsers,
          addAnimationUsers: [],
        });
      } else {
        this.setState({
          users: nextProps.users,
        });
      }
    }
  }

  isChanged = (user, prevUser) => {
    return (
      prevUser &&
      //user.rank !== prevUser.rank &&
      user.eloRating !== prevUser.eloRating
    );
  };

  getPrevUser = (user, prevUsers) => {
    if (!prevUsers) return;
    return prevUsers.filter(prevUser => prevUser.uid === user.uid).shift();
  };

  animationDone = event => {
    console.log('animationend');
    const uid = event.target.getAttribute('data-uid');
    let newRemoveAnimationUsers = [];
    let newAddAnimationUsers = [];

    const removeUser = this.state.removeAnimationUsers
      .filter(rUser => rUser.uid === uid)
      .shift();
    const addUser = this.state.addAnimationUsers
      .filter(aUser => aUser.uid === uid)
      .shift();

    if (removeUser) {
      newRemoveAnimationUsers = this.state.removeAnimationUsers.filter(
        rUser => rUser.uid !== uid
      );
      newAddAnimationUsers = this.state.addAnimationUsers.slice();
      newAddAnimationUsers.push(removeUser);
      this.setState({
        removeAnimationUsers: newRemoveAnimationUsers,
        addAnimationUsers: newAddAnimationUsers,
      });
    } else if (addUser) {
      this.setState({
        users: this.props.users,
      });

      setTimeout(() => {
        newAddAnimationUsers = this.state.addAnimationUsers.filter(
          aUser => aUser.uid !== uid
        );

        this.setState({
          addAnimationUsers: newAddAnimationUsers,
        });
      }, 0);
    }
  };

  render() {
    let users;
    if (this.state.users) {
      users = this.state.users
        .sort((a, b) => -(a.eloRating - b.eloRating))
        .map((user, key) => {
          const prevUser = this.getPrevUser(
            user,
            this.state.removeAnimationUsers
          );
          const nextUser = this.getPrevUser(user, this.state.addAnimationUsers);

          return (
            <ListUser
              key={user.uid}
              data-uid={user.uid}
              changedRank={prevUser}
              showChangedRank={nextUser}
            >
              <User user={user} />
            </ListUser>
          );
        });
    }
    return <div ref={elm => (this.animationRef = elm)}>{users}</div>;
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
