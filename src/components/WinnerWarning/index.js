import React from 'react';
import { BounceIn } from 'animate-css-styled-components';
import { WinnerWarningWrapper, WinnerWarningCenter, BoomText, BoomTextShadow } from './styles';
import Avatar from './components/Avatar';

const WinnerWarning = (props) => {

    const calculateStreak = (gameList) => {
        let streak = 1;
        gameList.split('').reduceRight((prev, current) => {
            if (current === prev) {
                streak++;
                return current;
            }
            return;
        });

        return streak;
    }

    const setVictoryName = (streak) => {
        if (streak >= 10) {
            return 'godlike';
        } else if (streak >= 6) {
            return 'rampage';
        } else if (streak >= 3) {
            return 'dominating';
        }
        return 'victory';
    }

    let victoryName = setVictoryName(calculateStreak('WWWLLLLLLLLLWWLWWWW'));

    if (!props.hidden) {
        return (
            <WinnerWarningWrapper>
                <WinnerWarningCenter>
                    <audio autoPlay="autoplay" src={`/sound/victory/${victoryName}.mp3`} type="audio/mpeg" />
                    <BounceIn delay=".5s" duration="1s">
                        <Avatar />
                    </BounceIn>
                    <BounceIn delay=".7s" duration=".5s">
                        <BoomText>
                            {victoryName}!
                    </BoomText>
                        <BoomTextShadow>
                            {victoryName}!
                    </BoomTextShadow>
                    </BounceIn>
                </WinnerWarningCenter>
            </WinnerWarningWrapper>
        );
    }
    return ('');
}

export default WinnerWarning;