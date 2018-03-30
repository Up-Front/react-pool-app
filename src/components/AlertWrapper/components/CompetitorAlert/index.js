import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from './../../../shared/constants';
import { BounceIn, BounceOut } from 'animate-css-styled-components';
import { findOtherCompetitor, findWinner } from './../../../../actions/matches';
import {
  calculateStreak,
  setVictoryName,
  increaseStreak,
} from './../../../../actions/competitors';
import {
  AlertWrapper,
  WinnerWarningCenter,
  BoomText,
  BoomTextShadow,
} from './styles';
import Avatar from './components/Avatar';

class CompetitorAlert extends Component {
  constructor(props) {
    super(props);

    if (props.match.finishedAt) {
      const user = findWinner(props.match);
      // the new streak of the user is not calculated yet
      user.streak = increaseStreak(user.streak, constants.WINVALUE);

      const streak = calculateStreak(user);
      const victoryName = setVictoryName(streak);
      this.state = {
        user,
        streak,
        victoryName,
        sound: victoryName,
      };
    } else {
      this.state = {
        user: findOtherCompetitor(props.auth, props.match.competitors),
        victoryName: 'Game on',
      };
    }
  }

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

  //

  render() {
    let sound;
    if (this.state.sound) {
      sound = (
        <audio
          autoPlay="autoplay"
          src={`/sound/victory/${this.state.sound}.mp3`}
          type="audio/mpeg"
        />
      );
    }
    return (
      <AlertWrapper>
        {sound}
        <WinnerWarningCenter>
          <BounceIn delay=".5s" duration="1s">
            <BounceOut
              delay="5s"
              duration=".5s"
              innerRef={x => {
                this.animationRef = x;
              }}
            >
              <Avatar user={this.state.user} />
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
              <BoomText>{this.state.victoryName}!</BoomText>
              <BoomTextShadow>{this.state.victoryName}!</BoomTextShadow>
            </BounceOut>
          </BounceIn>
        </WinnerWarningCenter>
      </AlertWrapper>
    );
  }
}

CompetitorAlert.propTypes = {
  match: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

export default CompetitorAlert;
