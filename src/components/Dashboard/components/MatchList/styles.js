import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  .remove-enter {
    max-height: 0;
  }
  .remove-enter-active {
    max-height: 100px;
    transition: all 500ms ease-in;
  }
  .remove-exit {
    max-height: 100px;
  }
  .remove-exit-active {
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
