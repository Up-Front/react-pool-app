import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
  background: ${props => props.theme.background};
  background-image: ${props => props.theme.backgroundImage};
  font-size: ${props => props.theme.fontSize};

  & * {
    box-sizing: border-box;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: 'space-between';
  ${props => (props.selfStart ? 'align-self: flex-start;' : '')};
  align-items: center;
  flex-direction: 'row';
  padding: 10px;
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.headerBackgroundColor};

  & a {
    color: ${props => props.theme.headerFontColor};
  }
`;

export const HeaderLogo = styled.h1``;

export const FullScreen = styled.section`
  flex: 1;
  width: 100%;
  margin: 5px 0;
  overflow-y: scroll;
`;
