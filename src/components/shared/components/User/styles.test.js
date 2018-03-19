import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { Avatar } from './styles';

describe('Avatar component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<Avatar />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders at number 1', () => {
    const wrapper = shallow(<Avatar position={0} />);
    expect(wrapper).toHaveStyleRule(
      'background',
      'linear-gradient(to right,#f9d423 0%,#ff4e50 100%)'
    );
  });
});
