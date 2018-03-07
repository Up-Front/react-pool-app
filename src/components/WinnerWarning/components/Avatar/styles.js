import styled, { injectGlobal } from 'styled-components';

export const AvatarWrapper = styled.div`
    position: relative;
    width: 30vw;
    height: 30vw;
    border-radius: 50%;
    border: 1vw solid grey;
    background-color: green;
    transition: transform 1s ease-out;
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

