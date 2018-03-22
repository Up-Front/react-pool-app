import { calcHead2Head } from './competitors';

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
});
