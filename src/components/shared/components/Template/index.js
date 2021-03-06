import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Dashboard from './../../../Dashboard';
import Leaderboard from './../../../Leaderboard';
import AlertWrapper from './../../../AlertWrapper';
import { Wrapper, Header, FullScreen, HeaderLogo } from './styles';
import { logoutUser } from './../../../../actions/auth';

const Template = props => (
  <Wrapper>
    <AlertWrapper />
    <Header>
      <Link to="/">
        <HeaderLogo role="banner">FrontMen</HeaderLogo>
      </Link>
      <button onClick={logoutUser}>logout</button>
      <Link to="/leaderboard">leaderboard</Link>
    </Header>
    <FullScreen>
      <Switch>
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </FullScreen>
  </Wrapper>
);

export default Template;
