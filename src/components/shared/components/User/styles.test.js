import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { UserWrapper, UserEloRating } from './styles';

describe('UserWrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<UserWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('UserEloRating component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<UserEloRating />);
    expect(wrapper).toMatchSnapshot();
  });
});
