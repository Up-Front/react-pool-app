import styled from 'styled-components';
import { iconStyle } from './../../../shared/styles';

export const SwipeWrapper = styled.div`
  position: relative;
  padding: 0;
  overflow: hidden;
`;

export const DeleteLayer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 10px;
  background-color: ${props => props.theme.deleteBackgroundColor};
  color: white;
`;

export const DeleteLayerLeft = styled.div`
  flex: 1;
  color: rgba(255,255,255,0.7);

  &:before {
    ${iconStyle('trash')}
  }
`;

export const DeleteLayerRight = styled.div`
  flex: 1;
  text-align: right;
  color: rgba(255,255,255,0.7);

  &:before {
    ${props => iconStyle('trash')}
  }
`;

export const SwipeContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  user-select: none;
`;

export const SwipeContent = styled.div`
  position: relative;
  box-shadow: 4px 0 2px rgba(0, 0, 0, 0.4), -4px 0 2px rgba(0, 0, 0, 0.4);

  transition-property: ${props =>
    props.deleteDirection === 'left' ||
    props.deleteDirection === 'right' ||
    props.deleteCancel
      ? 'left'
      : ''};
  transition-duration: ${props =>
    props.deleteDirection === 'left' ||
    props.deleteDirection === 'right' ||
    props.deleteCancel
      ? '.5s'
      : ''};
  left: ${props =>
    props.deleteDirection === 'left'
      ? '-100%!important'
      : props.deleteDirection === 'right'
        ? '100%!important'
        : props.deleteCancel ? '0!important' : ''};
`;
