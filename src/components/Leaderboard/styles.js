import styled from 'styled-components';

export const ListUser = styled.div`
  transform: scale(1);
  transition: transform 1500ms ease-in;
  ${props =>
    props.changedRank
      ? `
      transition: transform 1500ms ease-in;
      transform: scale(0); 

  `
      : ``};

  ${props =>
    props.showChangedRank
      ? `
      transition: transform 1500ms ease-in;
  transform: scale(1);
  
  `
      : ``};
`;
