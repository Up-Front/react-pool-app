import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Header, FullScreen, HeaderLogo } from './components/Styles';

const Template = props => (
  <Wrapper>
    <Header>
      <Link to="/leaderboard">Leaderboard</Link>
      <HeaderLogo>
        <Link to="/dashboard">Dashboard</Link>
      </HeaderLogo>
      <Link to="/login">Log In</Link>
    </Header>
    <FullScreen>{props.children}</FullScreen>
  </Wrapper>
);

export default Template;
