import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { theme } from './../../theme';
import { Wrapper, Header, FullScreen } from './styles';

describe('Wrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<Wrapper theme={theme} />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Header component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<Header theme={theme} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('FullScreen component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<FullScreen theme={theme} />);
    expect(wrapper).toMatchSnapshot();
  });
});
