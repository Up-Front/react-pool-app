import React from 'react';
import { shallow } from 'enzyme';
import User from './';

describe('User component', () => {
  let uid;
  let auth;
  beforeEach(() => {
    uid = '1';
    auth = {
      uid: 1,
      displayName: 'Bob de Bouwer',
      avatarUrl: 'http://image',
    };
  });

  test('renders without crashing', () => {
    const wrapper = shallow(<User uid={uid} user={auth} />);
    expect(wrapper).toMatchSnapshot();
  });
});
