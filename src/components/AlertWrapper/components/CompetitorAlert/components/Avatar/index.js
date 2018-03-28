import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AvatarImage } from './styles';

const Avatar = ({ user }) => {
  return (
    <Fragment>
      <AvatarImage src={user.avatarUrl} />
    </Fragment>
  );
};

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
};
export default Avatar;
