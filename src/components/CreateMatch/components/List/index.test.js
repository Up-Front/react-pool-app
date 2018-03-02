import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import List from './';

test('renders without crashing', () => {
    shallow(<List />);
});

test('render List', () => {
    const wrapper = shallow(
        <List />
    );
    expect(wrapper).toMatchSnapshot();
});

