import styled from 'styled-components';
import {MobileWrapper} from './../shared/styles';

export const Login = styled.div`
  display: flex;
  padding-top: 100px;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 12px 12px;
  font-size: 120%;
  cursor: pointer;
  border: 0 none;
  border-radius: 4px;
  color: black;
  background: rgba(255, 255, 255, 0.5);

  :hover {
    background: rgba(255, 255, 255, 0.7);
    transition: all 150ms linear;
  }
`;

export const LoginWrapper = styled(MobileWrapper)`
background: url(background_small.jpg) no-repeat center center; 
background-size: 100%;
  width: 100%;
  height: 100%;
`;