import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { SelectOpponent } from './styles';

describe('SelectOpponent component', () => {
  xtest('renders normally', () => {
    const wrapper = shallow(<SelectOpponent />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('display', 'block');
  });

  xtest('renders hidden', () => {
    const wrapper = shallow(<SelectOpponent matchCreated="matchCreated" />);
    expect(wrapper).toHaveStyleRule('display', 'none');
  });
});
