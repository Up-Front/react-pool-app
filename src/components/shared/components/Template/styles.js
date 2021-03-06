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

export const HeaderLogo = styled.h1`
  display: inline-block;
  margin: 5px 0;
  width: 40px;
  height: 40px;
  text-indent: -3333px;
  background: transparent url(/logo.svg) no-repeat scroll 0% 0%;
  cursor: pointer;
`;

export const FullScreen = styled.section`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
`;
