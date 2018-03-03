import React from 'react';
import { shallow, mount } from 'enzyme';
import matches from './matches';

describe('Match model', () => {
    test('return correct model full', () => {
        const checkModel = {
            userA: 1,
            userB: 2,
            createdAt: 3,
            winnerA: 4,
            winnerB: 5
        }

        const model = matches(checkModel);
        expect(model).toEqual(checkModel);

    });

    test('return a model when not all is given', () => {
        const checkModel = {
            userA: 1,
            userB: 2
        }

        const model = matches(checkModel);
        expect(model.createdAt).not.toBeNull();
        expect(model.winnerA).toBeNull();
        expect(model.winnerB).toBeNull();
    });
});
