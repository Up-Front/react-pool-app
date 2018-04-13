import styled, {injectGlobal} from 'styled-components';

injectGlobal`
@font-face {
  font-family: "FontAwesome";
  font-weight: normal;
  font-style : normal;
         src : url("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.eot?v=4.3.0");
         src : url("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.eot?#iefix&v=4.3.0") format("embedded-opentype"),
               url("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.woff2?v=4.3.0") format("woff2"),
               url("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.woff?v=4.3.0") format("woff"),
               url("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.ttf?v=4.3.0") format("truetype"),
               url("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.svg?v=4.3.0#fontawesomeregular") format("svg");
  }

  body {
    background-color: #000;
  }
`;

export const ClearButtonStyle = styled.button`
  border: 0;
  background-color: transparent;
`;

export const Button = styled.button`
  border: 0;
  background-color: ${props => props.theme.buttonColor};
  color: ${props => props.theme.buttonFontColor};
  font-size: 16px;
  padding: 5px 10px;

  &:disabled {
    opacity: .5;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0 10px;
  line-height: 60px;
  background-color: rgba(255,255,255,.5);
  font-size: 16px;
  border: 1px solid ${props => props.theme.borderColor};

  display: ${props => props.hide ? 'none' : 'block'};
`;

export const MobileWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

const returnIcon = icon => {
  switch(icon){
    case 'sign-out-alt': return '\f08b';
    case 'trophy': return '\f091';
    case 'home': return '\f015';
    case 'trash': return '\f1f8';
    case 'times': return '\f00d';
    default: return;
  }

}
export const iconStyle = icon =>`
  font-size: 26px;
  font-family: FontAwesome; 
  content: '${returnIcon(icon)}';
`;