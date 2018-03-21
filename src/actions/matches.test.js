import React from 'react';
import sinon from 'sinon';
import { setMatchStatus, checkWinner, setEloRating, increaseStreak, findOtherCompetitor } from './matches';
import Constants from './../components/shared/constants';

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
      winners: { 1: 1, 2: 2 }
    };

    const expectedResult = {
      competitors: { 1: 1, 2: 2 },
      createdAt: 3,
      finishedAt: null,
      winner: null,
      isContested: true,
      winners: { 1: 1, 2: 2 }
    };

    const model = setMatchStatus(1, checkModel);
    expect(model).toEqual(expectedResult);
  });

  test('expected endresult', () => {
    const checkModel = {
      competitors: { 1: 1, 2: 2 },
      createdAt: 3,
      winner: 3,
      winners: { 1: 1, 2: 1 }
    };

    const expectedResult = {
      competitors: { 1: 1, 2: 2 },
      createdAt: 3,
      finishedAt: now.getTime(),
      winner: 1,
      isContested: false,
      winners: { 1: 1, 2: 1 }
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

  test('checkWinner method for winner result', () => {
    const checkModel = { 1: 1, 2: 1 };
    const { winner, isContested } = checkWinner(checkModel);

    expect(isContested).toEqual(false);
    expect(winner).toEqual(1);
  });

  test('checkWinner method for contested result', () => {
    const checkModel = { 1: 2, 2: 1 };
    const { winner, isContested } = checkWinner(checkModel);

    expect(isContested).toEqual(true);
    expect(winner).toEqual(null);
  });

  describe('increaseStreak', () => {
    test('increaseStreak add a match', () => {
      const expectedResult = 'LL';
      const result = increaseStreak('L', 'L');
  
      expect(result).toEqual(expectedResult);
    });

    test('increaseStreak add a match when result was null', () => {
      const expectedResult = 'L';
      const result = increaseStreak(null, 'L');
  
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOtherCompetitor', () => {
    const expectedResult = {2:2};
    const competitor = {2:2}
    const user = {1:2};
    const competitors = [user, competitor];

    const result = findOtherCompetitor(user, competitors);

    expect(expectedResult).toEqual(competitor);
  });

  describe('Match actions', () => {
    test('When the user loses', () => {
      const competitors = {
        0: {
          uid: 1,
          eloRating: 200
        },
        1: {
          uid: 2,
          eloRating: 1000
        }
      }
      const expectedResult = 195;
      const result = setEloRating(Constants.loseValue, competitors[0], competitors);

      expect(result).toEqual(expectedResult);
    });

    test('When the user wins', () => {
      const competitors = {
        0: {
          uid: 1,
          eloRating: 200
        },
        1: {
          uid: 2,
          eloRating: 1000
        }
      };
      const expectedResult = 227;
      const result = setEloRating(Constants.winValue, competitors[0], competitors);

      expect(result).toEqual(expectedResult);
    });

    test('When the user does not have a rating yet', () => {
      const competitors = {
        0: {
            uid: 1
          },
          1: {
            uid: 2
          }
        };
  
        const expectedResult = 1016;
        const result = setEloRating(Constants.winValue, competitors[0], competitors);
  
        expect(result).toEqual(expectedResult);
    });
  });

  
  


});
