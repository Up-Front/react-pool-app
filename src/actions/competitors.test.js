import {
  calcHead2Head,
  increaseStreak,
  setVictoryName,
  calculateStreak,
  enrichCompetitor,
} from './competitors';

describe('Competitor actions', () => {
  describe('calcHead2Head', () => {
    test('calcHead2Head normal result', () => {
      const expectedResult = '4-2';
      const competitorA = {
        uid: 1,
        results: {
          2: 'WWWWLL',
        },
      };

      const competitorB = {
        uid: 2,
      };

      const result = calcHead2Head(competitorA, competitorB);
      expect(result).toEqual(expectedResult);
    });

    test('calcHead2Head no results', () => {
      const expectedResult = '0-0';
      const competitorA = {
        uid: 1,
      };

      const competitorB = {
        uid: 2,
      };

      const result = calcHead2Head(competitorA, competitorB);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('setVictoryName', () => {
    test('streak godlike', () => {
      const expectedResult = 'godlike';
      const result = setVictoryName(12);

      expect(result).toEqual(expectedResult);
    });

    test('streak rampage', () => {
      const expectedResult = 'rampage';
      const result = setVictoryName(8);

      expect(result).toEqual(expectedResult);
    });

    test('streak dominating', () => {
      const expectedResult = 'dominating';
      const result = setVictoryName(3);

      expect(result).toEqual(expectedResult);
    });

    test('no streak', () => {
      const expectedResult = 'victory';
      let result = setVictoryName();

      expect(result).toEqual(expectedResult);

      result = setVictoryName(-1);
      expect(result).toEqual(expectedResult);

      result = setVictoryName(undefined);
      expect(result).toEqual(expectedResult);

      result = setVictoryName(NaN);
      expect(result).toEqual(expectedResult);
    });
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

  describe('calculateStreak', () => {
    test('calculate streak length', () => {
      const competitor = {
        uid: 'abc',
        displayName: 'He-man',
        streak: 'LLLWWWLWWWW',
      };

      const result = calculateStreak(competitor);
      expect(result).toEqual(4);
    });

    test('calculate streak length when no streak given', () => {
      const competitor = {
        uid: 'abc',
        displayName: 'He-man',
      };

      const result = calculateStreak(competitor);
      expect(result).toEqual(0);
    });
  });

  describe('enrichCompetitor', () => {
    let competitor;
    let presence;
    let rankings;
    beforeEach(() => {
      competitor = {
        uid: 'abc',
      };

      presence = {
        abc: true,
      };

      rankings = [
        {
          key: 1,
          value: {
            abc: {
              eloRanking: 1000,
              ranking: 1,
            },
          },
        },
        {
          key: 2,
          value: {
            abc: {
              eloRanking: 800,
              ranking: 2,
            },
          },
        },
      ];
    });
    test('enrich with all data', () => {
      const expectedResult = {
        uid: 'abc',
        online: true,
        currentRanking: {
          eloRanking: 800,
          ranking: 2,
        },
        previousRanking: {
          eloRanking: 1000,
          ranking: 1,
        },
      };

      const result = enrichCompetitor({ competitor, presence, rankings });
      expect(result).toEqual(expectedResult);
    });

    test('without rankings', () => {
      const expectedResultNoRanking = {
        uid: 'abc',
        online: true,
        currentRanking: {},
        previousRanking: {},
      };

      const resultNoRanking = enrichCompetitor({
        competitor,
        presence,
        ranking: null,
      });
      expect(resultNoRanking).toEqual(expectedResultNoRanking);
    });

    test('without presence', () => {
      const expectedResultNoPresence = {
        uid: 'abc',
        currentRanking: {},
        previousRanking: {},
      };

      const resultNoPresence = enrichCompetitor({
        competitor,
        presence: null,
        ranking: null,
      });
      expect(resultNoPresence).toEqual(expectedResultNoPresence);
    });
  });
});
