import React from 'react';
import { shallow, mount } from 'enzyme';
import Constants from './../../../shared/constants';
import Competitor from './';

describe('Competitor component', () => {
  let competitor;
  let handleClick;
  beforeEach(() => {
    competitor = {
      uid: '1',
      displayName: 'Bob de Bouwer',
    };

    handleClick = jest.fn();
  });

  test('renders without crashing', () => {
    const wrapper = shallow(
      <Competitor
        align={Constants.ALIGNLEFT}
        competitor={competitor}
        handleClick={handleClick}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('handleClick', () => {
    const wrapper = shallow(
      <Competitor
        checkAuthIsCompetitor={true}
        competitor={competitor}
        handleClick={handleClick}
        align={Constants.ALIGNLEFT}
      />
    );
    wrapper.find('[onClick]').simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('check that you voted', () => {
    const wrapper = mount(
      <Competitor
        align={Constants.ALIGNLEFT}
        hasVote={true}
        competitor={competitor}
        handleClick={handleClick}
      />
    );
    expect(wrapper.find('div.name').length).toEqual(1);
  });

  test('render of winner', () => {
    const wrapper = mount(
      <Competitor
        winner="1"
        align={Constants.ALIGNLEFT}
        competitor={competitor}
        handleClick={handleClick}
      />
    );

    expect(wrapper.find('strong').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});
