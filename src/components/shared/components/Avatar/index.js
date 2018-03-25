import React from 'react';
import PropTypes from 'prop-types';
import { AvatarImage, AvatarWrapper } from './styles';

const Avatar = ({ user }) => {
  return (
    <AvatarWrapper rank={user.rank}>
      <AvatarImage src={user.avatarUrl} online={user.online} />
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  user: {
    rank: null,
    avatarUrl: null,
    online: false,
  },
};
Avatar.propTypes = {
  user: PropTypes.object,
};

export default Avatar;
