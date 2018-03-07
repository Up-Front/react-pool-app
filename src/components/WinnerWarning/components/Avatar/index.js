import React from 'react';
import { AvatarWrapper, AvatarImage, LeaderIcon } from './styles';

const Avatar = (props) => {
    return (
        <AvatarWrapper>
            <AvatarImage src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="avatar" />
            <LeaderIcon />
        </AvatarWrapper>
    );
}

export default Avatar;