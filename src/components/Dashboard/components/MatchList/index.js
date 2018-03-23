import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate,
} from 'react-redux-firebase';
import { enrichCompetitor } from './../../../../actions/competitors';
import Match from './../../../Match';
import { MatchListWrapper } from './styles';

const MatchList = props => {
  /**
   * check if the authUser is a competitor in this match
   * TODO: this needs to be refactored to a seperate file, because this function is used in multiple places.
   * but will cause a big merge conflict when done now
   */
  const checkAuthIsCompetitor = competitors => {
    let isCompetitor = false;
    Object.values(competitors).forEach(competitor => {
      if (competitor.uid === props.auth.uid) {
        isCompetitor = true;
      }
    });
    return isCompetitor;
  };

  const enrichCompetitorData = ([matchId, match]) => {
    match.competitors = Object.values(match.competitors).map(competitor => {
      return enrichCompetitor({
        competitor,
        presence: props.presence,
        rankings: props.rankings,
      });
    });
    return [matchId, match];
  };

  if (isLoaded(props.matches) && !isEmpty(props.matches)) {
    const matches = Object.entries(props.matches)
      .reverse()
      .filter(([matchId, match]) => !match.finishedAt)
      .filter(([matchId, match]) => checkAuthIsCompetitor(match.competitors))
      .map(enrichCompetitorData)
      .map(([matchId, match]) => {
        return (
          <Match
            key={matchId}
            matchId={matchId}
            match={match}
            auth={props.auth}
          />
        );
      });

    return <MatchListWrapper>{matches}</MatchListWrapper>;
  } else {
    return <div />;
  }
};

const populates = [
  { child: 'competitors', root: 'users', keyProp: 'uid' }, // replace competitors with user object
];

const enhance = compose(
  firebaseConnect(props => [
    {
      path: '/matches',
      queryParams: ['orderByChild=finishedAt', 'equalTo=null'],
      populates,
    },
    {
      path: 'rankings',
      queryParams: ['orderByKey', 'limitToLast=2'],
    },
    { path: 'presence' },
    { path: 'auth' },
  ]),
  connect(({ firebase }) => ({
    presence: firebase.data.presence || {},
    matches: populate(firebase, 'matches', populates),
    rankings: firebase.ordered.rankings,
    auth: firebase.auth,
  }))
);
export const MatchListTest = MatchList;
export default enhance(MatchList);
