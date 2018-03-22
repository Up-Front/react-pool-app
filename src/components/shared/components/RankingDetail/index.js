import React from 'react';
import PropTypes from 'prop-types';
import constants from './../../constants';

const RankingDetail = props => {
  const eloRating = props.currentRanking.eloRating || props.eloRating;
  const currentRanking = props.currentRanking.ranking;
  return (
    <div>
      {eloRating} {currentRanking}
    </div>
  );
};

RankingDetail.defaultProps = {
  eloRating: constants.DEFAULTELORATING,
  currentRanking: {},
  previousRanking: {},
};

RankingDetail.propTypes = {
  eloRating: PropTypes.number.isRequired,
  currentRanking: PropTypes.object.isRequired,
  previousRanking: PropTypes.object.isRequired,
};

export default RankingDetail;
