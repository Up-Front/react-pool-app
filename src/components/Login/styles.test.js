import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { Login, Button, LoginWrapper } from './styles';

describe('Login component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Button component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('LoginWrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<LoginWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});
