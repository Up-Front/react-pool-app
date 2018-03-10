import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Header, FullScreen, HeaderLogo } from './components/Styles';

const Template = props => (
  <Wrapper>
    <Header>
      <HeaderLogo>
        <Link to="/dashboard">FrontMen</Link>
      </HeaderLogo>
      <Link to="/">/</Link>
      <Link to="/login">login</Link>

      <Link to="/leaderboard">leaderboard</Link>
      <Link to="/create-match">challenge!</Link>
    </Header>
    <FullScreen>{props.children}</FullScreen>
  </Wrapper>
);

export default Template;
