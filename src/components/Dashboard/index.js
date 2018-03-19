import React, { Fragment } from 'react';
import MatchList from './components/MatchList';
import CreateMatch from './../CreateMatch';

const Dashboard = () => (
  <Fragment>
    <CreateMatch key="CreateMatch" />
    <MatchList key="MatchList" />
  </Fragment>
);

export default Dashboard;
