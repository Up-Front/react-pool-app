import React from 'react';
import { AvatarWrapper, AvatarImage, LeaderIcon } from './styles';

const Avatar = ({ auth }) => {
    return (
        <AvatarWrapper>
            <AvatarImage src={auth.photoURL} alt="avatar" />
            <LeaderIcon />
        </AvatarWrapper>
    );
}

export default Avatar;


