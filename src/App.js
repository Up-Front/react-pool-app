import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Authorization from './components/shared/components/Authorization';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import Leaderboard from './components/Leaderboard';
import Template from './components/shared/components/Template';
import CreateMatch from './components/CreateMatch';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import { theme } from './components/shared/theme';
import configureStore from './store'

const initialState = window.__INITIAL_STATE__; // set initial state here
const store = configureStore(initialState);

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

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Template>
              <React.Fragment>
                <Route exact path="/" component={Page} />
                <Route path="/login" component={Login} />
                <Route path="/leaderboard" component={Authorization(Leaderboard)} />
                <Route path="/dashboard" component={Authorization(Dashboard)} />
                <Route path="/create-match" component={Authorization(CreateMatch)} />
              </React.Fragment>
            </Template>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
