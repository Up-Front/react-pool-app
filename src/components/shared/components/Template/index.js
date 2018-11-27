import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Dashboard from './../../../Dashboard';
import Leaderboard from './../../../Leaderboard';
import AlertWrapper from './../../../AlertWrapper';
import {
  Wrapper,
  Header,
  FullScreen,
  HeaderButton,
  HeaderLink,
  Icon,
} from './styles';
import { logoutUser } from './../../../../actions/auth';

const Template = props => (
  <Wrapper>
    <AlertWrapper />
    <Header>
      <HeaderLink icon="home" to="/" arai-label="Frontmen" />
      <HeaderLink to="/leaderboard" icon="trophy" aria-label="Leaderboard" />
      <HeaderButton
        onClick={logoutUser}
        icon="sign-out-alt"
        aria-label="Logout"
      />
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
