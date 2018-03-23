import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import constants from './../../constants';
import { CompetitorWrapper, CompetitorLine, CompetitorName } from './styles';

describe('CompetitorWrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<CompetitorWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('CompetitorLine component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<CompetitorLine align={constants.ALIGNRIGHT} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('flex-direction', 'row-reverse');
  });

  test('aligns reverse', () => {
    const wrapper = shallow(<CompetitorLine align={constants.ALIGNLEFT} />);
    expect(wrapper).toHaveStyleRule('flex-direction', 'row');
  });
});

describe('CompetitorName component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<CompetitorName align={constants.ALIGNRIGHT} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('text-align', 'right');
  });

  test('aligns reverse', () => {
    const wrapper = shallow(<CompetitorName align={constants.ALIGNRIGHT} />);
    expect(wrapper).toHaveStyleRule('text-align', 'right');
  });
});
