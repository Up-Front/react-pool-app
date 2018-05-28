import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './../Avatar';
import RankingDetail from './../RankingDetail';
import { UserWrapper, UserEloRating } from './styles';

const User = ({ user, ...props }) => {
  const handleClickEvent = () => {
    if (typeof props.handleClick === 'function') {
      props.handleClick(props.uid, user);
    }
  };

  return (
    <UserWrapper onClick={handleClickEvent}>
      <RankingDetail
        currentRanking={user.currentRanking}
        previousRanking={user.previousRanking}
      />
      <Avatar user={user} />
      <div>
        <strong>{user.displayName}</strong>
        <UserEloRating data-test="elorating">
          points: <span>{user.currentRanking.eloRating}</span>
        </UserEloRating>
      </div>
    </UserWrapper>
  );
};
User.propTypes = {
  handleClick: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default User;
