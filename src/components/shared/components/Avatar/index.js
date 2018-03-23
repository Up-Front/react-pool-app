import React from 'react';
import PropTypes from 'prop-types';
import { AvatarImage } from './styles';

const Avatar = ({ user }) => {
  return <AvatarImage src={user.avatarUrl} online={user.online} />;
};

Avatar.propTypes = {
  user: PropTypes.object,
};

export default Avatar;
