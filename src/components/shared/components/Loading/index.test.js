import React from 'react';
import { shallow } from 'enzyme';
import Constants from './../../../shared/constants';
import Loading from './';

describe('Loading Component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
