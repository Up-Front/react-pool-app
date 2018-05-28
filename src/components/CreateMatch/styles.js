import styled from 'styled-components';
import { iconStyle } from './../shared/styles';

export const SelectOpponent = styled.section`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => (props.show ? 'block' : 'none')};
`;

export const FloatButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;

  font-size: 24px;
  font-weight: bold;
  line-height: 24px;

  z-index: 998;
`;

export const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 60px;
  overflow: hidden;
`;

export const SearchResult = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchClear = styled.button`
  position: absolute;
  top: 16px;
  right: 10px;
  border: 0;
  color: white;
  cursor: pointer;
  background-color: transparent;
  &:before {
    ${iconStyle('times')};
  }
`;
