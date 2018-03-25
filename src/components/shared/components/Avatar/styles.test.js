import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { AvatarImage, AvatarWrapper } from './styles';
import { theme } from './../../theme';

describe('AvatarWrapper component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<AvatarWrapper theme={theme} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('ranked first', () => {
    const wrapper = shallow(<AvatarWrapper theme={theme} rank={1} />);
    expect(wrapper).toHaveStyleRule('transform-origin', 'center');
  });
});

describe('AvatarImage component', () => {
  test('renders normally', () => {
    const wrapper = shallow(<AvatarImage />);
    expect(wrapper).toMatchSnapshot();
  });

  test('when online', () => {
    const wrapper = shallow(<AvatarImage theme={theme} online={true} />);
    expect(wrapper).toHaveStyleRule('border-color', theme.statusOnlineColor);
  });
});
