import React, { Fragment } from 'react';
import { AvatarImage } from './styles';

const Avatar = ({ user }) => {
  return (
    <Fragment>
      <AvatarImage src={user.avatarUrl} />
    </Fragment>
  );
};

export default Avatar;
