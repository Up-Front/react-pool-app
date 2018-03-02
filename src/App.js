import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Template from './components/shared/components/Template';
import Lottie from 'react-lottie';
import * as animationData from './pool.json'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const Loading = ({ history }) => (<Rotate><span role='img' aria-label='left hand'>👈</span><span role='img' aria-label='8-ball'>🎱</span><span role='img' aria-label='right hand'>👉</span></Rotate>)


const Page = ({ history }) => (
  <Loading key='loader' />
)
 const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: animationData
};

const Login = ()=>(<Lottie options={defaultOptions} /> )
class App extends Component {
  render() {
    return (
      <Router>
        <Template>
          <React.Fragment>
            <Route exact path="/" component={Page} />
            <Route path="/login" component={Login} />
            <Route path="/leaderboard" component={Page} />
            <Route path="/dashboard" component={Dashboard} />
          </React.Fragment>
        </Template>
      </Router>
    );
  }
}

export default App;
