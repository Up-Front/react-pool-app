import React from 'react';
import { shallow, mount } from 'enzyme';
import Match from './';

describe('Match component', () => {
  let match;
  let auth;
  let matchId;
  beforeEach(() => {
    matchId = '1';
    auth = {
      uid: 1,
      displayName: 'Bob de Bouwer',
    };
    match = {
      uid: '1',
      competitors: {
        0: {
          uid: 1,
          displayName: 'Bob de Bouwer',
        },
        1: {
          uid: 2,
          displayName: 'Asterix',
        },
      },
    };
  });

  test('renders without crashing', () => {
    const wrapper = shallow(
      <Match matchId={matchId} auth={auth} match={match} />
    );

    expect(wrapper.find('SwipeDelete').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  test('when there is a winner, there is no delete button', () => {
    match = {
      uid: '1',
      winner: '2',
      competitors: {
        0: {
          uid: 1,
          displayName: 'Bob de Bouwer',
        },
        1: {
          uid: 2,
          displayName: 'Asterix',
        },
      },
    };

    const wrapper = shallow(
      <Match matchId={matchId} auth={auth} match={match} />
    );

    const result = wrapper.instance().hasWinner(match);
    expect(result).toEqual(true);

    expect(wrapper.find('SwipeDelete').length).toEqual(0);
  });

  test('check that auth has voted', () => {
    match = {
      uid: '1',
      competitors: {
        0: {
          uid: 1,
          displayName: 'Bob de Bouwer',
        },
        1: {
          uid: 2,
          displayName: 'Asterix',
        },
      },
      winners: {
        '1': 2,
      },
    };

    const wrapper = shallow(
      <Match matchId={matchId} auth={auth} match={match} />
    );

    const result = wrapper.instance().checkAuthVote(match.competitors[1]);
    expect(result).toEqual(true);
  });
});
