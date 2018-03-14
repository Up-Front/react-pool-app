import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Competitor from './components/Competitor';
import SwipeDelete from './../shared/components/SwipeDelete';
import { declareWinner, removeMatch } from './../../actions/matches';
import { MatchWrapper } from './styles';

class Match extends Component {
  constructor(props) {
    super(props);
    this.handleDeclareWinner = this.handleDeclareWinner.bind(this);
  }

  /**
   * user can only declare winner, if he is 1 of the competitors
   * and only 1 time
   */
  handleDeclareWinner(competitor) {
    declareWinner(
      this.props.matchId,
      this.props.match,
      competitor,
      this.props.auth
    );
  }

  /**
   * check if the auth has voted for the competitor
   * so we can show that on the component
   * the votes are in the match.winners property
   */
  checkAuthVote(competitor) {
    if (
      this.props.match.winners &&
      this.props.match.winners[this.props.auth.uid]
    ) {
      if (this.props.match.winners[this.props.auth.uid] === competitor.uid) {
        return true;
      }
    }
    return false;
  }

  /**
   * check if the authUser is a competitor in this match
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

  canBeDeleted(match) {
    return !this.hasWinner(match) && this.checkAuthIsCompetitor(match.competitors);
  }

  hasWinner(match) {
    return !!match.winner;
  }

  renderMatch() {
    const contestedText = this.props.isContested
      ? 'this match result is contested'
      : '';
    return (
      <MatchWrapper contested={this.props.match.isContested}>
        <strong>{contestedText}</strong>
        {Object.values(this.props.match.competitors).map(competitor => {
          return (
            <Competitor
              key={competitor.uid}
              checkAuthIsCompetitor={this.checkAuthIsCompetitor(
                this.props.match.competitors
              )}
              competitor={competitor}
              hasVote={this.checkAuthVote(competitor)}
              winner={this.props.match.winner}
              handleClick={this.handleDeclareWinner}
            />
          );
        })}
      </MatchWrapper>
  );
  }

  render() {
    if (this.canBeDeleted(this.props.match)) {
      return (<SwipeDelete
      key={this.props.matchId}
      deleteId={this.props.matchId}
      canbeSwiped={this.canBeDeleted(this.props.match)}
      onDelete={this.handleRemoveMatch}
      >
      {this.renderMatch()}
      </SwipeDelete>);
    } else {
      return this.renderMatch();
    }  
    
  }
}

Match.propTypes = {
  matchId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default Match;
