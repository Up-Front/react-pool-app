import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { ClearButtonStyle, Button } from './styles';

describe('ClearButtonStyle component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<ClearButtonStyle />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Button component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });
});
