import React from 'react';
import { FloatButton } from './styles';
import MatchList from './components/MatchList';

const Dashboard = () => [
  <MatchList key="MatchList" />,
  <FloatButton key="FloatButton">+</FloatButton>
];

export default Dashboard;
