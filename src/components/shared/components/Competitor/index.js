import React from 'react';
import PropTypes from 'prop-types';
import constants from './../../../shared/constants';
import RankingDetail from './../RankingDetail';
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
  ...props
}) => {
  const handleClick = () => {
    if (checkAuthIsCompetitor) {
      props.handleClick(competitor);
    }
  };

  const authVote = () => hasVote;

  return (
    <CompetitorWrapper onClick={handleClick} hasVote={authVote()}>
      <CompetitorLine align={props.align}>
        <CompetitorAvatar
          src={competitor.avatarUrl}
          online={competitor.online}
        />
        <RankingDetail
          eloRating={competitor.ranking}
          currentRanking={competitor.currentRanking}
          previousRanking={competitor.previousRanking}
        />
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

Competitor.defaultProps = {
  handleClick: () => {},
  online: false,
  align: constants.ALIGNLEFT,
};

Competitor.propTypes = {
  align: PropTypes.string.isRequired,
  checkAuthIsCompetitor: PropTypes.bool,
  competitor: PropTypes.object.isRequired,
  hasVote: PropTypes.bool,
  winner: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  online: PropTypes.bool,
};
export default Competitor;
