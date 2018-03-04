import styled from 'styled-components'

export const MatchWrapper = styled.li`
    margin: 2px 0;
    padding: 10px;
    width: 100%;
    border: 1px solid white;

    background-color: ${props => props.contested ? 'red' : ''};
`;