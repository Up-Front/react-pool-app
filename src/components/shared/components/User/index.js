import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, AvatarImage } from './styles';

const User = ({ user, ...props }) => {
  const handleClickEvent = () => {
    if (typeof props.handleClick === 'function') {
      props.handleClick(props.uid, user);
    }
  };

  return (
    <Avatar onClick={handleClickEvent} position={props.position}>
      <div>
        <AvatarImage height="64" width="64" src={user.avatarUrl} />
      </div>
      <div>
        <strong>
          {props.online ? '✳️' : '✴️'}
          {user.displayName}
        </strong>
        <div>{user.email}</div>
        <div>{user.eloRating}</div>
      </div>
    </Avatar>
  );
};
User.propTypes = {
  online: PropTypes.bool,
  position: PropTypes.number,
  handleClick: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default User;
