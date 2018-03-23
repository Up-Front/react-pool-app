import styled from 'styled-components';

export const RankingWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const RankMovement = styled.span`
  font-size: 16px;
  font-weight: normal;
`;

export const RankMovementDirection = styled.span`
  display: inline-block;
  opacity: ${props =>
    props.movement === 0 || props.movement === undefined ? '0' : '1'};
  color: ${props =>
    props.movement > 0
      ? props.theme.movementUp
      : props.movement < 0 ? props.theme.movementDown : ''};

  transform-origin: center center;
  transform: ${props =>
    props.movement > 0
      ? 'rotate(-90deg)'
      : props.movement < 0 ? 'rotate(90deg)' : ''};

  font-size: 24px;
`;
