import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BounceIn, BounceOut } from 'animate-css-styled-components';
import {
  AlertWrapper,
  WinnerWarningCenter,
  BoomText,
  BoomTextShadow,
} from './styles';
import Avatar from './components/Avatar';

class CompetitorAlert extends Component {
  componentDidMount() {
    this.animationRef.addEventListener('animationend', this.animationDone);
  }
  componentWillUnmount() {
    this.animationRef.removeEventListener('animationend', this.animationDone);
  }

  animationDone = () => {
    console.log('animation done');
    this.props.onEndAnimation();
  };

  calculateStreak = gameList => {
    let streak = 1;
    gameList.split('').reduceRight((prev, current) => {
      if (current === prev) {
        streak++;
      }
      return prev;
    });
    return streak;
  };

  setVictoryName = streak => {
    if (streak >= 10) {
      return 'godlike';
    } else if (streak >= 6) {
      return 'rampage';
    } else if (streak >= 3) {
      return 'dominating';
    }
    return 'victory';
  };

  victoryName = 'Game on!';
  // let victoryName = this.setVictoryName(
  //   this.calculateStreak()
  // );
  // <audio
  //         autoPlay="autoplay"
  //         src={'/sound/victory/' + victoryName + '.mp3'}
  //         type="audio/mpeg"
  //       />

  render() {
    return (
      <AlertWrapper>
        <WinnerWarningCenter>
          <BounceIn delay=".5s" duration="1s">
            <BounceOut
              delay="5s"
              duration=".5s"
              innerRef={x => {
                this.animationRef = x;
              }}
            >
              <Avatar user={this.props.opponent} />
            </BounceOut>
          </BounceIn>
          <BounceIn delay=".7s" duration=".5s">
            <BounceOut
              delay="5s"
              duration=".3s"
              innerRef={x => {
                this.animationRef = x;
              }}
            >
              <BoomText>{this.victoryName}!</BoomText>
              <BoomTextShadow>{this.victoryName}!</BoomTextShadow>
            </BounceOut>
          </BounceIn>
        </WinnerWarningCenter>
      </AlertWrapper>
    );
  }
}

CompetitorAlert.propTypes = {
  opponent: PropTypes.object,
};

export default CompetitorAlert;
