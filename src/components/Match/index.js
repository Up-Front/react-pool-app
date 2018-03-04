import React, { Component } from 'react';
import Competitor from './components/Competitor';
import { declareWinner } from './../../actions/matches';
import { MatchWrapper } from './styles';

class Match extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isContested: false,
            winner: null,
        };

        this.handleDeclareWinner = this.handleDeclareWinner.bind(this);
    }

    checkMatchStatus(match) {
        let winner;
        let first = true;
        let isContested = false;

        if (match && match.winners) {

            // if there are not the same amount of winners as competitors than there is nothing to do
            if (Object.keys(match.winners).length !== Object.keys(match.competitors).length) {
                return {};
            }


            Object.keys(match.winners).forEach((key) => {
                if (first) {
                    winner = match.winners[key];
                    first = false;
                }
                if (winner !== match.winners[key]) {
                    // a contested result\
                    isContested = true;
                }
            });

        }

        if (!isContested) {
            return { isContested: false, winner };
        } else {
            return { isContested, winner: null }
        }
    }

    /**
     * user can only declare winner, if he is 1 of the competitors
     * and only 1 time
     */
    handleDeclareWinner(competitor) {
        declareWinner(this.props.matchId, competitor, this.props.auth)
            .then((res) => {
                console.log('declared winner');

            });
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

    render() {
        const contestedText = this.state.isContested ? 'this match result is contested' : '';

        let { isContested, winner } = this.checkMatchStatus(this.props.match);
        return (
            <MatchWrapper contested={isContested}>
                <strong>{contestedText}</strong>
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
                                handleClick={this.handleDeclareWinner}
                            />
                        );
                    })
                }
            </MatchWrapper >
        );
    }

}

export default Match;