import React from 'react';
import { shallow } from 'enzyme';
import theme from './../../theme';
import RankingDetail from './';

describe('RankingDetail Component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<RankingDetail them={theme} />);
    expect(wrapper).toMatchSnapshot();
  });
});
