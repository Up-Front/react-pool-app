import styled from 'styled-components';

export const SelectOpponent = styled.section`
  display: ${props => (props.matchCreated ? 'none' : 'block')};
`;

export const FloatButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;

  font-size: 24px;
  font-weight: bold;
  line-height: 24px;

  z-index: 998;
`;
