import styled from 'styled-components';

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${props =>
    props.position === 0
      ? 'linear-gradient(to right, #f9d423 0%, #ff4e50 100%)'
      : 'white'};
  padding: 10px;
  border-radius: 8px;
`;

export const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin: 10px;
`;

export const UserList = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
`;
