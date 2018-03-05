import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  height:100%;
  flex-direction:column;
  padding:0;
  background: ${props => props.theme.background};
  background-image: ${props => props.theme.backgroundImage};
  font-size: ${props => props.theme.fontSize};
`;

export const Header = styled.header`
  padding: 10px;
  background:white;
  display: flex;
  justify-content: ${props => props.spaceBetween ? 'space-between' : 'center'};
  ${props => props.selfStart ? 'align-self: flex-start;' : ''}
  align-items: center;
  flex-direction:${props => props.row ? 'row' : 'column'};
  border-radius:8px;
  width:100%;
  box-sizing: border-box;
`;

export const FullScreen = styled.section`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
`;
