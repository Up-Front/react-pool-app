import styled from 'styled-components';

export const MatchWrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  background-color: ${props =>
    props.contested
      ? props.theme.contestedMatchBackgroundColor
      : props.theme.matchBackgroundColor};
  color: ${props => props.theme.fontColor};
`;

export const Versus = styled.div`
  width: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
`;
