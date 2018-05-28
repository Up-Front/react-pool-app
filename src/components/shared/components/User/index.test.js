import React from 'react';
import { shallow } from 'enzyme';
import User from './';

describe('User component', () => {
  let uid;
  let auth;
  let handleClick;
  beforeEach(() => {
    uid = '1';
    auth = {
      uid: 1,
      displayName: 'Bob de Bouwer',
      avatarUrl: 'http://image',
      currentRanking: {},
    };

    handleClick = jest.fn();
  });

  test('renders without crashing', () => {
    const wrapper = shallow(<User uid={uid} user={auth} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders check click handle', () => {
    const wrapper = shallow(
      <User uid={uid} user={auth} handleClick={handleClick} />
    );

    wrapper.find('[onClick]').simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
