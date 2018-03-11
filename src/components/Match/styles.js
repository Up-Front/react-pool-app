import styled from 'styled-components';
import { ClearButtonStyle } from './../shared/styles';

export const MatchWrapper = styled.li`
  position: relative;
  margin: 2px 0;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  background-color: ${props => (props.contested ? 'red' : '')};
  color: ${props => props.theme.fontColor};
`;

export const MatchRemoveButton = ClearButtonStyle.extend`
  position: absolute;
  top: -3px;
  right: 3px;
  width: 20px;
  height: 20px;

  color: ${props => props.theme.fontColor};
  font-size: 20px;
`;
