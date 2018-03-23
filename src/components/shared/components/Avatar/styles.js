import styled from 'styled-components';

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
