import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { setMatchCompetitors } from './../../../../actions/matches';
import EnrichCompetitors from './../../../shared/components/EnrichCompetitors';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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

  const setCompetitors = matchObject => {
    return setMatchCompetitors(matchObject, props.users);
  };

  if (
    isLoaded(props.matches) &&
    !isEmpty(props.matches) &&
    !isEmpty(props.users)
  ) {
    const matches = Object.values(props.matches)
      .reverse()
      .filter(({ key, value }) => !value.finishedAt)
      .map(setCompetitors)
      .filter(match => checkAuthIsCompetitor(match.competitors))
      .map(match => {
        return (
          <CSSTransition
            key={match.matchId}
            timeout={500}
            exit={true}
            classNames="remove"
          >
            <Match matchId={match.matchId} match={match} auth={props.auth} />
          </CSSTransition>
        );
      });

    console.log(matches);
    return (
      <MatchListWrapper>
        <TransitionGroup>{matches}</TransitionGroup>
      </MatchListWrapper>
    );
  } else {
    return <div />;
  }
};

const enhance = compose(
  firebaseConnect(props => [
    {
      path: '/matches',
      queryParams: ['orderByChild=finishedAt', 'equalTo=null'],
    },
    {
      path: '/users',
    },
    { path: 'auth' },
  ]),
  connect(({ firebase }) => ({
    matches: firebase.ordered.matches,
    users: firebase.ordered.users,
    auth: firebase.auth,
  }))
);
export const MatchListTest = MatchList;
export default EnrichCompetitors(enhance(MatchList));
