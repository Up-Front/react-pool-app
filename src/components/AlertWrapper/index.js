import React, { Component } from 'react';
import { database } from './../../store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { setMatchCompetitors } from './../../actions/matches';
import CompetitorAlert from './components/CompetitorAlert';

class AlertWrapper extends Component {
  initialState = {
    newMatch: false,
    match: null,
  };
  state = this.initialState;
  checkNewMatches = () => {
    const newMatchesRef = database.ref('matches');
    newMatchesRef
      .orderByChild('createdAt')
      .startAt(Date.now())
      .on('child_added', snapshot => {
        const match = setMatchCompetitors(
          { key: snapshot.key, value: snapshot.val() },
          this.props.users
        );
        this.setState({
          newMatch: true,
          match,
        });
      });
  };

  checkFinishedMatches = () => {
    const newMatchesRef = database.ref('matches');
    newMatchesRef.orderByChild('finishedAt').on('child_changed', snapshot => {
      let match = snapshot.val();
      if (!match.finishedAt) {
        return;
      }
      match = setMatchCompetitors(
        { key: snapshot.key, value: match },
        this.props.users
      );
      this.setState({
        newMatch: true,
        match,
      });
    });
  };
  componentDidMount() {
    this.checkNewMatches();
    this.checkFinishedMatches();
  }

  endAnimationHandler = () => {
    this.setState(this.initialState);
  };

  render() {
    const newMatchAlert = this.state.newMatch ? (
      <CompetitorAlert
        match={this.state.match}
        auth={this.props.auth}
        onEndAnimation={this.endAnimationHandler}
      />
    ) : (
      ''
    );
    return newMatchAlert;
  }
}

const enhance = compose(
  firebaseConnect(props => [
    {
      path: '/users',
    },
    { path: 'auth' },
  ]),
  connect(({ firebase }) => ({
    users: firebase.ordered.users,
    auth: firebase.auth,
  }))
);
export const AlertWrapperTest = AlertWrapper;
export default enhance(AlertWrapper);
