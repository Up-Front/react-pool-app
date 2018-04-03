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
      nextUsers: [],
      removeAnimationUsers: [],
      addAnimationUsers: [],
    };
  }

  componentDidMount() {
    // bugfix in react-redux-firebase
    // the watchers have a problem
    // https://github.com/prescottprue/react-redux-firebase/issues/368#issuecomment-357917044
    this.props.firebase.watchEvent('value', `/users`);

    if (this.animationRef) {
      this.animationRef.addEventListener('transitionend', this.animationDone);
    }
  }

  componentWillUnmount() {
    this.animationRef.removeEventListener('transitionend', this.animationDone);
  }

  componentWillReceiveProps(nextProps) {
    console.log('staet', this.state.changedState);
    if (
      nextProps.users instanceof Array &&
      (!this.state.removeAnimationUsers.length &&
        !this.state.addAnimationUsers.length) &&
      this.isEnrichedData(nextProps.users)
    ) {
      const removeAnimationUsers = nextProps.users.filter(user => {
        const prevUser = this.getPrevUser(user, this.props.users);
        return this.isChanged(user, prevUser);
      });

      console.log('next', nextProps);
      console.log('changes', removeAnimationUsers);

      if (removeAnimationUsers.length) {
        console.log(1);
        this.setState({
          users: this.props.users,
          nextUsers: nextProps.users,
          changedState: true,
          removeAnimationUsers,
          addAnimationUsers: [],
        });
      } else if (!this.state.changedState) {
        console.log(4);
        this.setState({
          users: nextProps.users,
        });
      }
    }
  }

  isEnrichedData = users => {
    return users.length && users[0].currentRanking.ranking;
  };

  isChanged = (user, prevUser) => {
    if (!prevUser.currentRanking.eloRating) return;
    return (
      prevUser &&
      prevUser.currentRanking &&
      user.currentRanking &&
      user.currentRanking.eloRating !== prevUser.currentRanking.eloRating &&
      user.currentRanking.ranking !== prevUser.currentRanking.ranking
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
      console.log('remove');

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
      }

      if (!newRemoveAnimationUsers.length) {
        this.setState({
          users: this.state.nextUsers,
          nextUsers: [],
        });
      }
    } else if (addUser) {
      console.log('add');

      if (addUser) {
        newAddAnimationUsers = this.state.addAnimationUsers.filter(
          aUser => aUser.uid !== uid
        );

        this.setState({
          addAnimationUsers: newAddAnimationUsers,
        });
      }
    } else if (!newAddAnimationUsers.length) {
      console.log('done');
      this.setState({
        changedState: false,
      });
    }
  };

  render() {
    let users;
    if (this.state.users) {
      users = this.state.users
        .sort(
          (a, b) => -(a.currentRanking.eloRating - b.currentRanking.eloRating)
        )
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
