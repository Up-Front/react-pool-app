import styled from 'styled-components';
import constants from './../../../shared/constants';

export const CompetitorWrapper = styled.div`
  flex: 1;
`;

export const CompetitorLine = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.align === constants.ALIGNRIGHT ? 'row-reverse' : 'row'};
  align-items: center;
  width: 100%;
`;

export const CompetitorAvatar = styled.img`
  margin: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const CompetitorName = styled.div`
  flex: 1;
  color: ${props => (props.hasVote ? 'green' : '')};
  text-align: ${props =>
    props.align === constants.ALIGNRIGHT ? 'right' : 'left'};
`;
