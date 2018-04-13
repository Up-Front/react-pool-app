import styled from 'styled-components';

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${props => props.theme.matchBackgroundColor};
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  color: ${props => props.theme.fontColor};
  width: 100%;
`;

export const UserEloRating = styled.div`
  color: rgba(255,255,255,0.5);
  font-size: ${props => props.theme.smallFont};
`;
