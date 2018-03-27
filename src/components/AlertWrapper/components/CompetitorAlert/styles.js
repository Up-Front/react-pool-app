import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Permanent Marker';
    font-style: normal;
    font-weight: 400;
    src: local('Permanent Marker Regular'), local('PermanentMarker-Regular'), url(https://fonts.gstatic.com/s/permanentmarker/v7/Fh4uPib9Iyv2ucM6pGQMWimMp004La2Cf5b6jlg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
`;

export const AlertWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
      flex: 1;
      position: absolute;
    }

    & > div:last-child {
      width: 100vw;
    }
  }
`;

export const WinnerWarningCenter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 30vw;
`;

export const AvatarImage = styled.img`
  position: absolute;
  top: 0;
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
`;

export const LeaderIcon = styled.div`
  position: relative;
  width: 15vw;
  height: 15vw;
  transform: rotate(-30deg);

  &:after {
    content: '👑';
    position: relative;
    top: -5vw;
    left: 5vw;
    font-size: 8vw;
  }
`;

export const BoomTextBase = styled.h2`
  position: absolute;
  top: -7vw;
  transform: rotate(-5deg);
  width: 100vw;
  text-align: center;
  font-family: 'Permanent Marker';
  font-size: 10vw;
`;

export const BoomText = styled(BoomTextBase)`
  background: linear-gradient(
    to bottom,
    #e8bf2e 0%,
    #e58500 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 1;
`;

export const BoomTextShadow = styled(BoomTextBase)`
  opacity: 0.4;
  text-shadow: 4px 4px 2px rgba(0, 0, 0, 1);
`;
