import styled from 'styled-components'

export const SelectOpponent = styled.section`
   display: ${props => props.matchCreated ? 'none' : 'block'};

`;