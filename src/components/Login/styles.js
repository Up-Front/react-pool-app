import styled from 'styled-components';

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 12px 12px;
  margin: 10px;
  font-size: 120%;
  cursor: pointer;
  border: 0 none;
  border-radius: 4px;
  color: black;
  background: rgba(255, 255, 255, 0.5);

  :hover {
    background-color: #517fa4;
    transition: all 150ms linear;
  }
`;
