import React from 'react';
import PropTypes from 'prop-types';
import { RankingWrapper, RankMovement, RankMovementDirection } from './styles';

const RankingDetail = props => {
  const currentRanking = props.currentRanking.ranking || 0;
  const previousRanking = props.previousRanking.ranking || 0;
  let movement = previousRanking - currentRanking;

  const renderRankMovement = () => {
    let absMovement = Math.abs(movement);
    if (!movement) {
      absMovement = '-';
    }

    return (
      <RankMovement>
        <RankMovementDirection movement={movement}>»</RankMovementDirection>
        {absMovement}
      </RankMovement>
    );
  };

  return (
    <RankingWrapper>
      {currentRanking}.
      {renderRankMovement()}
    </RankingWrapper>
  );
};

RankingDetail.defaultProps = {
  currentRanking: {},
  previousRanking: {},
};

RankingDetail.propTypes = {
  currentRanking: PropTypes.object.isRequired,
  previousRanking: PropTypes.object.isRequired,
};

export default RankingDetail;
