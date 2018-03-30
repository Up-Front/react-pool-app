import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  .fade-enter {
    max-height: 0;
  }
  .fade-enter-active {
    max-height: 100px;
    transition: all 500ms ease-in;
  }
  .fade-exit {
    max-height: 100px;
  }
  .fade-exit-active {
    max-height: 0;
    transition: all 500ms ease-in;
  }
`;

export const MatchListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
`;
