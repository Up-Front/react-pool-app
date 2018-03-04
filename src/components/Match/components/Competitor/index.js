import React from 'react';

const Competitor = ({ competitor, checkAuthIsCompetitor, hasVote, ...props }) => {
    const handleClick = () => {
        props.handleClick(competitor);
    }

    const authVote = () => {
        if (hasVote) {
            return 'your winner';
        }
    }

    const showWinnerButton = () => {
        if (checkAuthIsCompetitor) {
            return <button onClick={handleClick}>declare winner</button>
        }
    }
    return (
        <div>
            {competitor.displayName}
            {showWinnerButton()}
            {authVote()}
        </div>
    );
}

export default Competitor;