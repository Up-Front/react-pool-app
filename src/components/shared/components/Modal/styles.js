import styled from 'styled-components';
import { ClearButtonStyle } from './../../styles';

export const ModalWrapper = styled.div`
  position: absolute;
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  background: ${props => props.theme.background};
  background-image: ${props => props.theme.backgroundImage};
`;

export const ModalRemoveButton = ClearButtonStyle.extend`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;

  color: ${props => props.theme.fontColor};
  font-size: 20px;
`;

export const ModalFooter = styled.div`
  padding: 5px;
  height: 50px;
  line-height: 40px;
  border-top: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.headerBackgroundColor};
  text-align: right;
`;

export const ModalHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.headerBackgroundColor};
`;

export const ModalBody = styled.div`
  flex: 1;
`;
