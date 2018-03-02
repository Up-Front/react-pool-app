import React from 'react';
import { shallow, mount } from 'enzyme';
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

test('renders a list of users', () => {
    const users = [
        { id: 1, name: 'steven' },
        { id: 2, name: 'someone' }
    ];

    const component = mount(<List users={users} />);
    expect(component.find('li')).toHaveLength(2);


});