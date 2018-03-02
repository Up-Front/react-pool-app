import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux'
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

const Wrapper = styled.section`
  background: papayawhip;
  display: flex;
  align-items: center;
  height:100%;
  flex-direction:column;
  padding:0;
`;

const Segment = styled.section`
  padding: 10px;
  background:white;
  display: flex;
  justify-content: ${props => props.spaceBetween ? 'space-between' : 'center'};
  ${props => props.selfStart ? 'align-self: flex-start;' : ''}
  align-items: center;
  flex-direction:${props => props.row ? 'row' : 'column'};
  border-radius:8px;
  width:100%;
  box-sizing: border-box;
`

const FullScreen = styled.section`
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Loading = ({ history }) => (<Rotate><span role='img' aria-label='left hand'>👈</span><span role='img' aria-label='8-ball'>🎱</span><span role='img' aria-label='right hand'>👉</span></Rotate>)
const Header = ({ history }) => (<code>{history.location.pathname}</code>)


const Page = ({ history }) => (
  <Wrapper>
    <Segment>
      <Header history={history} />
      <Link to='/'>/</Link>
      <Link to='/login'>login</Link>
      <Link to='/dashboard'>dashboard</Link>
      <Link to='/leaderboard'>leaderboard</Link>
    </Segment>
    <FullScreen>
      <Loading key='loader' />
    </FullScreen>
  </Wrapper>
)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={Page} />
            <Route path="/login" component={Page} />
            <Route path="/leaderboard" component={Page} />
            <Route path="/dashboard" component={Dashboard} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
