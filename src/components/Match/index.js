import React, { Component } from 'react';
import Competitor from './components/Competitor';
import { declareWinner } from './../../actions/matches';

const Match = ({ match, auth, matchId }) => {

    /**
     * user can only declare winner, if he is 1 of the competitors
     * and only 1 time
     */
    const handleDeclareWinner = (competitor) => {
        declareWinner(matchId, competitor, auth)
            .then((res) => {
                console.log('declared winner');
            });
    }

    /**
     * check if the authUsaer is a competitor in this match
     */
    const checkAuthIsCompetitor = () => {
        let isCompetitor = false;
        Object.keys(match.competitors).forEach((key) => {
            const competitor = match.competitors[key];
            if (competitor.uid === auth.uid) {
                isCompetitor = true;
            }
        });
        return isCompetitor;
    }

    return (
        <div>
            {Object.keys(match.competitors).map((key) => {
                const competitor = match.competitors[key];
                return (
                    <Competitor key={competitor.uid} checkAuthIsCompetitor={checkAuthIsCompetitor()} competitor={competitor} handleClick={handleDeclareWinner} />
                );
            })
            }
        </div >
    );

}

export default Match;