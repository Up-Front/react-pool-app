import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './../Avatar';
import { UserWrapper } from './styles';

const User = ({ user, ...props }) => {
  const handleClickEvent = () => {
    if (typeof props.handleClick === 'function') {
      props.handleClick(props.uid, user);
    }
  };

  return (
    <UserWrapper onClick={handleClickEvent}>
      <Avatar user={user} />
      <div>
        <strong>{user.displayName}</strong>
        <div>{user.email}</div>
        <div>{user.eloRating}</div>
      </div>
    </UserWrapper>
  );
};
User.propTypes = {
  handleClick: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default User;
