import React from 'react';
import { shallow } from 'enzyme';
import { MatchListTest } from './';

describe('some tests of connected firebase components', () => {
  it('should have props.firebase', () => {
    const wrapper = shallow(<MatchListTest />);
    expect(wrapper).toMatchSnapshot();
  });
});
