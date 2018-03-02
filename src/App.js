import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store'
import styled, {keyframes} from 'styled-components'
import './App.css';

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
  justify-content: center;
  align-items: center;
  height:100%;
`;

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Wrapper>
              <Rotate><span role='img' aria-label='left hand'>👈</span><span role='img' aria-label='8-ball'>🎱</span><span role='img' aria-label='right hand'>👉</span></Rotate>
          </Wrapper>
        </Provider>
    );
  }
}

export default App;
