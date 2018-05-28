import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { MatchWrapper } from './styles';
import { theme } from './../shared/theme';

describe('MatchWrapper component', () => {
  xtest('renders normally', () => {
    const wrapper = shallow(<MatchWrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  xtest('renders contested', () => {
    const wrapper = shallow(<MatchWrapper theme={theme} contested />);
    expect(wrapper).toHaveStyleRule(
      'background-color',
      theme.contestedMatchBackgroundColor
    );
  });
});
