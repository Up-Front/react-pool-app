import React, { Component } from 'react';
import { database } from './../../store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { setMatchCompetitors } from './../../actions/matches';
import CompetitorAlert from './components/CompetitorAlert';

class AlertWrapper extends Component {
  state = {
    newMatch: false,
  };
  checkNewMatches = () => {
    const newMatchesRef = database.ref('matches');
    newMatchesRef
      .orderByChild('createdAt')
      .startAt(Date.now())
      .on('child_added', snapshot => {
        this.match = setMatchCompetitors(
          { key: snapshot.key, value: snapshot.val() },
          this.props.users
        );
        this.setState({
          newMatch: true,
        });
      });
  };
  componentDidMount() {
    this.checkNewMatches();
  }

  endAnimationHandler = () => {
    this.setState({
      newMatch: false,
    });
  };

  render() {
    const newMatchAlert = this.state.newMatch ? (
      <CompetitorAlert
        opponent={this.match.competitors[0]}
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
