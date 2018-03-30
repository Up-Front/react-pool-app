import React from 'react';
import { shallow } from 'enzyme';
import CompetitorAlert from './';

describe('CompetitorAlert component', () => {
  test('renders without crashing', () => {
    const auth = {
      uid: 'abc',
      displayName: 'He-man',
    };

    const match = {
      matchId: 'xyz',
      competitors: [
        {
          uid: 'abc',
          displayName: 'He-man',
        },
        {
          uid: 'xyz',
          displayName: 'skeletor',
        },
      ],
    };
    const wrapper = shallow(<CompetitorAlert auth={auth} match={match} />);
    expect(wrapper).toMatchSnapshot();
  });
});
