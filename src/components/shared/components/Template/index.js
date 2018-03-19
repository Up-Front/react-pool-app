import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Header, FullScreen, HeaderLogo } from './components/Styles';

const Template = props => (
  <Wrapper>
    <Header>
      <HeaderLogo>
        <Link to="/">FrontMen</Link>
      </HeaderLogo>
      <Link to="/login">login</Link>
      <Link to="/leaderboard">leaderboard</Link>
    </Header>
    <FullScreen>{props.children}</FullScreen>
  </Wrapper>
);

export default Template;
