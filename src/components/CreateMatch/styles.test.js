import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { SelectOpponent } from './styles';

describe('SelectOpponent component', () => {
    test('renders normally', () => {
        const wrapper = shallow(<SelectOpponent />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toHaveStyleRule('display', 'block');
    });

    test('renders hidden', () => {
        const wrapper = shallow(<SelectOpponent matchCreated />);
        expect(wrapper).toHaveStyleRule('display', 'none');
    });
});

