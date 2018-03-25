import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './';

describe('Dashboard component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
