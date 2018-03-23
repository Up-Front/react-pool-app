import styled from 'styled-components';

export const UserWrapper = styled.div`
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
