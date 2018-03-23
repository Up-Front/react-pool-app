import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { UserWrapper } from './styles';

describe('UserWrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<UserWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});
