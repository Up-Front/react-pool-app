import React from 'react';

const Competitor = ({ competitor, checkAuthIsCompetitor, hasVote, winner, ...props }) => {
    const isWinner = winner === competitor.uid ? true : false;

    const handleClick = () => {
        props.handleClick(competitor);
    }

    const authVote = () => {
        if (hasVote && !winner) {
            return 'your winner';
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

export default Competitor;