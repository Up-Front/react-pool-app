import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate
} from 'react-redux-firebase';
import Match from './../../../Match';
import { removeMatch } from './../../../../actions/matches';
import SwipeDelete from './../../../shared/components/SwipeDelete';
import { MatchListWrapper } from './styles';

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveMatch = this.handleRemoveMatch.bind(this);
  }
  /**
   * check if the authUser is a competitor in this match
   * TODO: this needs to be refactored to a seperate file, because this function is used in multiple places.
   * but will cause a big merge conflict when done now
   */
  checkAuthIsCompetitor(competitors) {
    let isCompetitor = false;
    Object.values(competitors).forEach(competitor => {
      if (competitor.uid === this.props.auth.uid) {
        isCompetitor = true;
      }
    });
    return isCompetitor;
  }

  handleRemoveMatch(matchId) {
    removeMatch(matchId)
      .then(() => {
        console.log('match removed');
      })
      .catch(() => {
        console.log('something went oops');
      });
  }

  render() {
    if (isLoaded(this.props.matches) && !isEmpty(this.props.matches)) {
      return (
        <MatchListWrapper>
          {Object.entries(this.props.matches)
            .reverse()
            .filter(([matchId, match]) => {
              return this.checkAuthIsCompetitor(match.competitors);
            })
            .map(([matchId, match]) => {
              return (
                <SwipeDelete
                  key={matchId}
                  deleteId={matchId}
                  onDelete={this.handleRemoveMatch}
                >
                  <Match
                    matchId={matchId}
                    match={match}
                    auth={this.props.auth}
                  />
                </SwipeDelete>
              );
            })}
        </MatchListWrapper>
      );
    } else {
      return <div />;
    }
  }
}

const populates = [
  { child: 'competitors', root: 'users', keyProp: 'uid' } // replace owner with user object
];

const enhance = compose(
  firebaseConnect(props => [
    {
      path: '/matches',
      queryParams: ['orderByChild=finishedAt', 'equalTo=null'],
      populates
    },
    { path: 'auth' }
  ]),
  connect(({ firebase }) => ({
    matches: populate(firebase, 'matches', populates),
    auth: firebase.auth
  }))
);

export default enhance(MatchList);
