import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import {
  AlertWrapper,
  WinnerWarningCenter,
  AvatarImage,
  LeaderIcon,
  BoomTextBase,
  BoomText,
  BoomTextShadow,
} from './styles';

describe('AlertWrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<AlertWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('WinnerWarningCenter component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<WinnerWarningCenter />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('AvatarImage component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<AvatarImage />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('LeaderIcon component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<LeaderIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('BoomTextBase component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<BoomTextBase />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('BoomText component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<BoomText />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('BoomTextShadow component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<BoomTextShadow />);
    expect(wrapper).toMatchSnapshot();
  });
});
