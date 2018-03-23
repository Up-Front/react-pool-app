import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { theme } from './../../theme';
import {
  DeleteLayer,
  DeleteLayerLeft,
  DeleteLayerRight,
  SwipeContentWrapper,
  SwipeContent,
} from './styles';

describe('DeleteLayer component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<DeleteLayer theme={theme} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('background-color', 'red');
  });
});

describe('DeleteLayerLeft component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<DeleteLayerLeft />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('DeleteLayerRight component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<DeleteLayerRight />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('SwipeContentWrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<SwipeContentWrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('SwipeContent component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<SwipeContent />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders normally swiped left', () => {
    const wrapper = shallow(<SwipeContent deleteDirection="left" />);
    expect(wrapper).toHaveStyleRule('left', '-100%!important');
  });

  test('renders normally swiped right', () => {
    const wrapper = shallow(<SwipeContent deleteDirection="right" />);
    expect(wrapper).toHaveStyleRule('left', '100%!important');
  });

  test('renders normally swipe cancelled', () => {
    const wrapper = shallow(<SwipeContent deleteCancel={true} />);
    expect(wrapper).toHaveStyleRule('left', '0!important');
  });
});
