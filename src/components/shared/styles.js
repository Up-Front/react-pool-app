import styled from 'styled-components';

export const ClearButtonStyle = styled.button`
  border: 0;
  background-color: transparent;
`;

export const Button = styled.button`
  border: 0;
  background-color: ${props => props.theme.buttonColor};
  color: ${props => props.theme.buttonFontColor};
  font-size: 16px;
  padding: 5px 10px;
`;
