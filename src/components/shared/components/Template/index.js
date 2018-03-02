import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Header, FullScreen } from './components/Styles';

const Template = (props) => (
    <Wrapper>
        <Header>
            <Link to='/'>/</Link>
            <Link to='/login'>login</Link>
            <Link to='/dashboard'>dashboard</Link>
            <Link to='/leaderboard'>leaderboard</Link>
            <Link to='/create-match'>challenge!</Link>
        </Header>
        <FullScreen>
            {props.children}
        </FullScreen>
    </Wrapper>
);

export default Template;