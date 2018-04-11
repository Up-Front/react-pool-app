import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MobileWrapper } from './../../../shared/styles';
import { iconStyle } from './../../../shared/styles';

export const Wrapper = styled(MobileWrapper)`
  position: relative;
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
  justify-content: 'space-around';
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

export const HeaderButton = styled.button`
  flex: 1;
  border: 0;
  background-color: transparent;
  color: ${props => props.theme.fontColor};
  &:hover{
    opacity: .5;
    cursor: pointer;
  }
  &:before {
    ${props => iconStyle(props.icon) }
  }
`;

export const HeaderLink = styled(Link)`
  flex: 1;
  text-align: center;
  text-decoration: none;
  &:hover{
    opacity: .5;
    cursor: pointer;
  }
  &:before {
    ${props => iconStyle(props.icon) }
  }
`;


export const FullScreen = styled.section`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
`;
