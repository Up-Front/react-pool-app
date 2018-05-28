import React from 'react';
import { shallow, mount } from 'enzyme';
import { LeaderboardTest } from './';

describe('Leaderboard component', () => {
  const firebase = jest.fn();
  firebase.watchEvent = jest.fn();

  const users = [
    {
      uid: 'abc',
      ranking: 3,
      eloRating: 900,
      displayName: 'Skeletor',
      currentRanking: {
        eloRating: 1,
      },
    },
    {
      uid: 'xyz',
      ranking: 1,
      eloRating: 1100,
      displayName: 'He-man',
      currentRanking: {
        eloRating: 2,
      },
    },
  ];

  test('renders without crashing', () => {
    const wrapper = mount(<LeaderboardTest firebase={firebase} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('showing users', () => {
    const wrapper = mount(
      <LeaderboardTest users={users} firebase={firebase} />
    );
    const firstResult = wrapper
      .find('div[data-test="elorating"]')
      .first()
      .text();

    const lastResult = wrapper
      .find('div[data-test="elorating"]')
      .last()
      .text();

    expect(wrapper.find('User').length).toBe(2);
  });

  test('sort users by ranking', () => {
    const wrapper = mount(
      <LeaderboardTest users={users} firebase={firebase} />
    );

    const firstResult = wrapper
      .find('div[data-test="elorating"] span')
      .first()
      .text();

    const lastResult = wrapper
      .find('div[data-test="elorating"] span')
      .last()
      .text();

    expect(parseInt(firstResult)).toBeGreaterThan(parseInt(lastResult));
  });
});
