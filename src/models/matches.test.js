import React from 'react';
import { shallow, mount } from 'enzyme';
import matches from './matches';

describe('Match model', () => {
    test('return correct model full', () => {
        const checkModel = {
            competitors: [1, 2],
            createdAt: 3,
            winners: [],
        }

        const model = matches(checkModel);
        expect(model).toEqual(checkModel);

    });

    test('return a model when not all is given', () => {
        const checkModel = {
            competitors: [1, 2]
        }

        const model = matches(checkModel);
        expect(model.createdAt).not.toBeNull();
        expect(model.winners).toHaveLength(0);
    });
});
