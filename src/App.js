import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authorization from './components/shared/components/Authorization';
import Login from './components/Login/Login';
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
        <Fragment>
          <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Authorization(Template)} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
