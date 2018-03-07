import React from 'react';
import { shallow } from 'enzyme';
import WinnerWarning from './';

it('renders without crashing', () => {
    shallow(<WinnerWarning />);
});