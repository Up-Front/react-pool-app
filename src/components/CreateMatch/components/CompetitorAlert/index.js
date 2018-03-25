import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { BounceIn } from 'animate-css-styled-components';
import {
  AlertWrapper,
  WinnerWarningCenter,
  BoomText,
  BoomTextShadow,
} from './styles';
import Avatar from './../../../shared/components/Avatar';

const CompetitorAlert = props => {
  const calculateStreak = gameList => {
    let streak = 1;
    gameList.split('').reduceRight((prev, current) => {
      if (current === prev) {
        streak++;
      }
      return prev;
    });
    return streak;
  };

  const setVictoryName = streak => {
    if (streak >= 10) {
      return 'godlike';
    } else if (streak >= 6) {
      return 'rampage';
    } else if (streak >= 3) {
      return 'dominating';
    }
    return 'victory';
  };

  // let victoryName = this.setVictoryName(
  //   this.calculateStreak()
  // );
  // <audio
  //         autoPlay="autoplay"
  //         src={'/sound/victory/' + victoryName + '.mp3'}
  //         type="audio/mpeg"
  //       />
  const victoryName = '';
  console.log(props.opponent);
  return (
    <AlertWrapper>
      <WinnerWarningCenter>
        <BounceIn delay=".5s" duration="1s">
          <Avatar user={props.opponent} />
        </BounceIn>
        <BounceIn delay=".7s" duration=".5s">
          <BoomText>{victoryName}!</BoomText>
          <BoomTextShadow>{victoryName}!</BoomTextShadow>
        </BounceIn>
      </WinnerWarningCenter>
    </AlertWrapper>
  );
};

CompetitorAlert.propTypes = {
  auth: PropTypes.object.isRequired,
  opponent: PropTypes.object,
};

export const CompetitorAlertTest = CompetitorAlert;

export default compose(
  firebaseConnect(props => []),
  connect(({ firebase }) => {
    return {};
  })
)(CompetitorAlert);
