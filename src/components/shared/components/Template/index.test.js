import React from 'react';
import { shallow } from 'enzyme';
import theme from './../../theme';
import Template from './';

describe('Template Component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Template them={theme} />);
    expect(wrapper).toMatchSnapshot();
  });
});
