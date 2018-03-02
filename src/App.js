import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components'
import './App.css';

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
      <Wrapper>
          <Rotate>👈 🎱 👉</Rotate>
      </Wrapper>
    );
  }
}

export default App;
