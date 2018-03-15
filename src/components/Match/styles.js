import styled from 'styled-components';

export const MatchWrapper = styled.li`
  position: relative;
  margin: 2px 0;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  background-color: ${props => (props.contested ? 'red' : '')};
  color: ${props => props.theme.fontColor};
`;
