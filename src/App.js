import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Authorization from './components/shared/components/Authorization';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import Leaderboard from './components/Leaderboard';
import Template from './components/shared/components/Template';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/shared/theme';
import configureStore from './store';

const initialState = window.__INITIAL_STATE__; // set initial state here
const store = configureStore(initialState);

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Template>
          <React.Fragment>
            <Route exact path="/" component={Authorization(Dashboard)} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/leaderboard"
              component={Authorization(Leaderboard)}
            />
          </React.Fragment>
        </Template>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
