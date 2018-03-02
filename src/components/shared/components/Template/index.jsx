import React from 'react';
import styled, { keyframes } from 'styled-components'
import { BrowserRouter as Router, Link } from 'react-router-dom';


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
`;

const FullScreen = styled.section`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
`;

const Template = (props) => (
    <Wrapper>
        <Segment>
            <Link to='/'>/</Link>
            <Link to='/login'>login</Link>
            <Link to='/dashboard'>dashboard</Link>
            <Link to='/leaderboard'>leaderboard</Link>
        </Segment>
        <FullScreen>
            {props.children}
        </FullScreen>
    </Wrapper>
);

export default Template;