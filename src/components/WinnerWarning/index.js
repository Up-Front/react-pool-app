import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
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
                    <audio autoPlay="autoplay" src={"/sound/victory/" + victoryName + ".mp3"} type="audio/mpeg" />
                    <BounceIn delay=".5s" duration="1s">
                        <Avatar auth={props.auth} />
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

const enhance = compose(
    firebaseConnect((props) => [
        { path: 'auth' },
    ]),
    connect(({ firebase }) => ({
        auth: firebase.auth,
    }))
);

export default enhance(WinnerWarning);
