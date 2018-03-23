import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { RankingWrapper, RankMovement, RankMovementDirection } from './styles';

describe('RankMovementDirection component', () => {
  test('renders normally without arrow showing', () => {
    const wrapper = shallow(<RankMovementDirection />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('opacity', '0');
  });

  test('renders normally up arrow', () => {
    const wrapper = shallow(<RankMovementDirection movement={1} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('transform', 'rotate(-90deg)');
    expect(wrapper).toHaveStyleRule('opacity', '1');
  });

  test('renders normally down arrow', () => {
    const wrapper = shallow(<RankMovementDirection movement={-1} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('transform', 'rotate(90deg)');
    expect(wrapper).toHaveStyleRule('opacity', '1');
  });
});
