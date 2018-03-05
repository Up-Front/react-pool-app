import React from 'react';
import { shallow, mount } from 'enzyme';
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
        const wrapper = shallow(<Competitor
            competitor={competitor}
            handleClick={handleClick}
        />);

        expect(wrapper).toMatchSnapshot();
    });

    test('handleClick', () => {
        const wrapper = shallow(<Competitor
            checkAuthIsCompetitor={true}
            competitor={competitor}
            handleClick={handleClick}
        />);

        wrapper.find('button').simulate('click');
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('check that you voted', () => {
        const wrapper = mount(<Competitor
            hasVote={true}
            competitor={competitor}
            handleClick={handleClick}
        />);
        expect(wrapper.find('div.winner').length).toEqual(1);
    });


    test('render of winner', () => {
        const wrapper = mount(<Competitor
            winner='1'
            competitor={competitor}
            handleClick={handleClick}
        />);

        expect(wrapper.find('strong').length).toEqual(1);
        expect(wrapper).toMatchSnapshot();
    });

});