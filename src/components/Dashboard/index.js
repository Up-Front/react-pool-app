import React from 'react';
import MatchList from './components/MatchList';
import CreateMatch from './../CreateMatch';

const Dashboard = () => [
  <CreateMatch key="CreateMatch" />,
  <MatchList key="MatchList" />
];

export default Dashboard;
