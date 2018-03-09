import React from 'react';
import sinon from 'sinon';
import { setMatchStatus } from './matches';

describe('Match actions', () => {

    let now = new Date();
    let clock;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        clock = sinon.useFakeTimers(now.getTime());
    });

    afterEach(() => {
        sandbox.restore();
        clock.restore();
    });

    test('2 different winners', () => {
        const checkModel = {
            competitors: { 1: 1, 2: 2 },
            createdAt: 3,
            winner: 3,
            winners: { 1: 1, 2: 2 },
        };

        const expectedResult = {
            competitors: { 1: 1, 2: 2 },
            createdAt: 3,
            finishedAt: null,
            winner: null,
            isContested: true,
            winners: { 1: 1, 2: 2 },
        };


        const model = setMatchStatus(1, checkModel);
        expect(model).toEqual(expectedResult);

    });

    test('expected endresult', () => {

        const checkModel = {
            competitors: { 1: 1, 2: 2 },
            createdAt: 3,
            winner: 3,
            winners: { 1: 1, 2: 1 },
        };

        const expectedResult = {
            competitors: { 1: 1, 2: 2 },
            createdAt: 3,
            finishedAt: now.getTime(),
            winner: 1,
            isContested: false,
            winners: { 1: 1, 2: 1 },
        };

        const model = setMatchStatus(1, checkModel);
        expect(model).toEqual(expectedResult);
    });

    test('when winners object is null', () => {
        const checkModel = {
            competitors: { 1: 1, 2: 2 },
            createdAt: 3,
            winners: {}
        };

        const expectedResult = {};

        const model = setMatchStatus(1, checkModel);
        expect(model.winners).toEqual(expectedResult);
    });
});
