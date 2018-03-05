import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Competitor from './components/Competitor';
import { declareWinner, removeMatch } from './../../actions/matches';
import { MatchWrapper } from './styles';

class Match extends Component {

    constructor(props) {
        super(props);
        this.handleDeclareWinner = this.handleDeclareWinner.bind(this);
        this.handleRemoveMatch = this.handleRemoveMatch.bind(this);

    }



    /**
     * user can only declare winner, if he is 1 of the competitors
     * and only 1 time
     */
    handleDeclareWinner(competitor) {
        declareWinner(this.props.matchId, this.props.match, competitor, this.props.auth)
    }

    /** 
     * check if the auth has voted for the competitor
     * so we can show that on the component
     * the votes are in the match.winners property
    */
    checkAuthVote(competitor) {
        if (this.props.match.winners && this.props.match.winners[this.props.auth.uid]) {
            if (this.props.match.winners[this.props.auth.uid] === competitor.uid) {
                return true;
            }
        }
        return false;
    }

    /**
     * check if the authUsaer is a competitor in this match
     */
    checkAuthIsCompetitor(competitors) {
        let isCompetitor = false;
        Object.keys(competitors).forEach((key) => {
            const competitor = competitors[key];
            if (competitor.uid === this.props.auth.uid) {
                isCompetitor = true;
            }
        });
        return isCompetitor;
    }

    handleRemoveMatch() {
        removeMatch(this.props.matchId)
            .then(() => {
                console.log('match removed');
            });
    }

    removeMatchTemplate(winner) {
        if (!winner) {
            return (
                <button className="deletebutton" onClick={this.handleRemoveMatch}>
                    remove match
                </button>
            );
        }
    }

    render() {
        const contestedText = this.props.isContested ? 'this match result is contested' : '';
        return (
            <MatchWrapper contested={this.props.match.isContested}>
                <strong>{contestedText}</strong>
                {this.removeMatchTemplate(this.props.match.winner)}
                {
                    Object.keys(this.props.match.competitors).map((key) => {
                        const competitor = this.props.match.competitors[key];
                        const hasVote = this.checkAuthVote(competitor);

                        return (
                            <Competitor
                                key={competitor.uid}
                                checkAuthIsCompetitor={this.checkAuthIsCompetitor(this.props.match.competitors)}
                                competitor={competitor}
                                hasVote={hasVote}
                                winner={this.props.match.winner}
                                handleClick={this.handleDeclareWinner}
                            />
                        );
                    })
                }
            </MatchWrapper >
        );
    }

}

Match.propTypes = {
    matchId: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default Match;