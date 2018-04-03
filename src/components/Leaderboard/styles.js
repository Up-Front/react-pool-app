import styled from 'styled-components';

export const ListUser = styled.div`
  transform: scale(1);
  transition: all 500ms ease-in;
  ${props =>
    props.changedRank
      ? `
      transform: scale(0); 
  background-color: green;
  `
      : ``};

  ${props =>
    props.showChangedRank
      ? `
 
  transform: scale(0);
  background-color: yellow;
  
  `
      : ``};
`;
