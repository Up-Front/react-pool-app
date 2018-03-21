import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from './../shared/constants';
import Competitor from './components/Competitor';
import SwipeDelete from './../shared/components/SwipeDelete';
import { declareWinner, removeMatch } from './../../actions/matches';
import { MatchWrapper, Versus, Head2Head } from './styles';

class Match extends Component {
  /**
   * user can only declare winner, if he is 1 of the competitors
   * and only 1 time
   */
  handleDeclareWinner = competitor => {
    declareWinner(
      this.props.matchId,
      this.props.match,
      competitor,
      this.props.auth
    );
  };

  /**
   * check if the auth has voted for the competitor
   * so we can show that on the component
   * the votes are in the match.winners property
   */
  checkAuthVote(competitor) {
    if (
      this.props.match.winners &&
      this.props.match.winners[this.props.auth.uid] &&
      this.props.match.winners[this.props.auth.uid] === competitor.uid
    ) {
      return true;
    }
    return false;
  }

  /**
   * check if the authUser is a competitor in this match
   */
  checkAuthIsCompetitor(competitors) {
    return !!Object.values(competitors)
      .filter(competitor => competitor.uid === this.props.auth.uid)
      .shift();
  }

  handleRemoveMatch(matchId, match) {
    removeMatch(matchId, match)
      .then(() => {
        console.log('match removed');
      })
      .catch(() => {
        console.log('something went oops');
      });
  }

  canBeDeleted(match) {
    return (
      !this.hasWinner(match) && this.checkAuthIsCompetitor(match.competitors)
    );
  }

  hasWinner(match) {
    return !!match.winner;
  }

  //find the head2head score of the 2 competitors
  calcHead2Head(competitorA, competitorB) {
    const streak = competitorA.results && competitorA.results[competitorB.uid];
    let wins = 0;
    let losses = 0;
    if (streak) {
      wins = (streak.match(new RegExp(Constants.winValue, 'g')) || []).length;
      losses = (streak.match(new RegExp(Constants.loseValue, 'g')) || [])
        .length;
    }
    return `${wins}-${losses}`;
  }

  renderCompetitor(competitor, align) {
    return (
      <Competitor
        align={align}
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
  }

  renderMatch() {
    const contestedText = this.props.isContested
      ? 'this match result is contested'
      : '';

    const competitorA = this.props.match.competitors[0];
    const competitorB = this.props.match.competitors[1];

    return (
      <MatchWrapper contested={this.props.match.isContested}>
        <strong>{contestedText}</strong>
        {this.renderCompetitor(competitorA, Constants.ALIGNLEFT)}
        <Versus>
          vs
          <Head2Head>{this.calcHead2Head(competitorA, competitorB)}</Head2Head>
        </Versus>
        {this.renderCompetitor(competitorB, Constants.ALIGNRIGHT)}
      </MatchWrapper>
    );
  }

  render() {
    if (this.canBeDeleted(this.props.match)) {
      return (
        <SwipeDelete
          key={this.props.matchId}
          deleteId={this.props.matchId}
          deleteObject={this.props.match}
          canbeSwiped={this.canBeDeleted(this.props.match)}
          onDelete={this.handleRemoveMatch}
        >
          {this.renderMatch()}
        </SwipeDelete>
      );
    } else {
      return this.renderMatch();
    }
  }
}

Match.propTypes = {
  matchId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Match;
