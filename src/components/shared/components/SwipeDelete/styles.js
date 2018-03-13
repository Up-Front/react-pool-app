import styled from 'styled-components';

export const SwipeWrapper = styled.div`
  position: relative;
  padding: 0;
  overflow: hidden;
`;

export const DeleteLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const SwipeContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  user-select: none;
`;

export const SwipeContent = styled.div`
  position: relative;

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
