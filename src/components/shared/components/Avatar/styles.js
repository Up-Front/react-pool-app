import styled from 'styled-components';

export const AvatarWrapper = styled.div`
  position: relative;
  display: block;

  ${props =>
    props.rank === 1
      ? `
        transform-origin: center;
        &:after {
          position: absolute;
          top: -10px;
          left: 5px;
          display: block;
          content: '👑';
          transform: rotate(-25deg);
        }
    `
      : ``};
`;
export const AvatarImage = styled.img`
  margin: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.online
      ? props.theme.statusOnlineColor
      : props.theme.statusOfflineColor};
`;
