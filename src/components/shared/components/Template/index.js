import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Header, FullScreen, HeaderLogo } from './styles';
import { logoutUser } from './../../../../actions/auth';

const Template = props => (
  <Wrapper>
    <Header>
      <HeaderLogo>
        <Link to="/">FrontMen</Link>
      </HeaderLogo>
      <button onClick={logoutUser}>logout</button>
      <Link to="/leaderboard">leaderboard</Link>
    </Header>
    <FullScreen>{props.children}</FullScreen>
  </Wrapper>
);

export default Template;
