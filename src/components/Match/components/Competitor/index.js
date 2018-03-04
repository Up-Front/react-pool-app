import React from 'react';

const Competitor = ({ competitor, checkAuthIsCompetitor, ...props }) => {
    const handleClick = () => {
        props.handleClick(competitor);
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
        </div>
    );
}

export default Competitor;