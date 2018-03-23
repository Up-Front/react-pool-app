import React from 'react';
import { shallow, mount } from 'enzyme';
import { MatchListTest } from './';

describe('MatchList Component', () => {
  let matches;
  let auth;
  beforeEach(() => {
    matches = {
      '0': {
        competitors: {
          0: {
            uid: '1',
            displayName: 'He-man',
          },
          1: {
            uid: '2',
            displayName: 'Skeletor',
          },
        },
        winners: {},
      },
    };

    auth = {
      uid: '1',
      displayName: 'Bob de Bouwer',
    };
  });
  test('should render', () => {
    const wrapper = shallow(<MatchListTest />);
    expect(wrapper).toMatchSnapshot();
  });
});
