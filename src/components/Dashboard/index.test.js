import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './';

it('renders without crashing', () => {
    shallow(<Dashboard />);
});