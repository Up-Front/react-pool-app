import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate,
} from 'react-redux-firebase';
import { getStartOfWeek } from './../../../shared/utils/time';
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

  const getRanking = numb => {
    return props.rankings && props.rankings[numb];
  };

  if (isLoaded(props.matches) && !isEmpty(props.matches)) {
    const matches = Object.entries(props.matches)
      .reverse()
      .filter(([matchId, match]) => !match.finishedAt)
      .filter(([matchId, match]) => checkAuthIsCompetitor(match.competitors))
      .map(([matchId, match]) => {
        return (
          <Match
            key={matchId}
            matchId={matchId}
            match={match}
            currentRanking={getRanking(1)}
            previousRanking={getRanking(0)}
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
  { child: 'competitors', root: 'users', keyProp: 'uid' }, // replace owner with user object
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
    { path: 'auth' },
  ]),
  connect(({ firebase }) => ({
    matches: populate(firebase, 'matches', populates),
    rankings: firebase.ordered.rankings,
    auth: firebase.auth,
  }))
);
export const MatchListTest = MatchList;
export default enhance(MatchList);
