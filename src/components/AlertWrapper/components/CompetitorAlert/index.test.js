import React from 'react';
import { shallow } from 'enzyme';
import CompetitorAlert from './';

describe('CompetitorAlert component', () => {
  test('renders without crashing', () => {
    const auth = {
      uid: 'abc',
      displayName: 'He-man',
    };
    const wrapper = shallow(<CompetitorAlert auth={auth} />);
    expect(wrapper).toMatchSnapshot();
  });
});
