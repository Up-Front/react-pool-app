import React from 'react';
import PropTypes from 'prop-types';
import Constant from './../../../shared/constants';
import {
  CompetitorWrapper,
  CompetitorAvatar,
  CompetitorName,
  CompetitorLine,
} from './styles';

const Competitor = ({
  competitor,
  checkAuthIsCompetitor,
  hasVote,
  winner,
  ...props
}) => {
  const isWinner = winner === competitor.uid ? true : false;

  const handleClick = () => {
    if (checkAuthIsCompetitor && !winner) {
      props.handleClick(competitor);
    }
  };

  const authVote = () => hasVote && !winner;

  if (isWinner) {
    return <strong>{competitor.displayName} 👑</strong>;
  }
  return (
    <CompetitorWrapper onClick={handleClick} hasVote={authVote()}>
      <CompetitorLine align={props.align}>
        <CompetitorAvatar src={competitor.avatarUrl} />
        <CompetitorName
          className="name"
          align={props.align}
          hasVote={authVote()}
        >
          {competitor.displayName}
        </CompetitorName>
      </CompetitorLine>
    </CompetitorWrapper>
  );
};

Competitor.propTypes = {
  align: PropTypes.string.isRequired,
  checkAuthIsCompetitor: PropTypes.bool,
  competitor: PropTypes.object.isRequired,
  hasVote: PropTypes.bool,
  winner: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
export default Competitor;
