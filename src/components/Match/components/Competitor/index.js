import React from 'react';
import PropTypes from 'prop-types';


const Competitor = ({ competitor, checkAuthIsCompetitor, hasVote, winner, ...props }) => {
    const isWinner = winner === competitor.uid ? true : false;

    const handleClick = () => {
        props.handleClick(competitor);
    }

    const authVote = () => {
        if (hasVote && !winner) {
            return (
                <div className="winner">your winner</div>
            );
        }
    }

    const showWinnerButton = () => {
        if (checkAuthIsCompetitor && !winner) {
            return <button onClick={handleClick}>declare winner</button>
        }
    }

    if (isWinner) {
        return (
            <div>
                <strong>
                    {competitor.displayName} 👑
                </strong>
            </div>
        );
    }
    return (

        <div>
            {competitor.displayName}
            {showWinnerButton()}
            {authVote()}
        </div>
    );
}

Competitor.propTypes = {
    checkAuthIsCompetitor: PropTypes.bool,
    competitor: PropTypes.object.isRequired,
    hasVote: PropTypes.bool,
    winner: PropTypes.string,
    handleClick: PropTypes.func.isRequired
};
export default Competitor;