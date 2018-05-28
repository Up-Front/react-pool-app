import sinon from 'sinon';
import { calculateLeaderBoardData } from './leaderboard';
import * as funcs from './competitors';
import { getStartOfWeek } from './../components/shared/utils/time';
import { database } from './../store';
import constants from './../components/shared/constants';

describe('calculateLeaderBoard', () => {
  let now = new Date();
  let clock;
  let sandbox;
  let startOfWeek;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    clock = sinon.useFakeTimers({ now: now.getTime() });
    startOfWeek = getStartOfWeek();

    const users = {
      abc: {
        uid: 'abc',
        rank: 2,
      },
      xyz: {
        uid: 'xyz',
        rank: 1,
      },
    };
    sinon.stub(funcs, 'getUserData').returns({
      then: () => users,
    });
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
    funcs.getUserData.restore();
  });

  describe('calculateLeaderBoardData', () => {
    xtest('order users by ranking', () => {
      const users = [
        {
          uid: 'abc',
          rank: 2,
          currentRanking: {
            eloRating: 800,
          },
        },
        {
          uid: 'xyz',
          rank: 1,
          currentRanking: {
            eloRating: 1000,
          },
        },
      ];
      const expectedResult = {
        [`rankings/${startOfWeek.getTime()}/abc`]: {
          eloRating: 800,
          ranking: 2,
        },
        [`rankings/${startOfWeek.getTime()}/xyz`]: {
          eloRating: 1000,
          ranking: 1,
        },
        'users/abc/rank': 2,
        'users/xyz/rank': 1,
      };

      const model = calculateLeaderBoardData(users);

      expect(model).toEqual(expectedResult);
    });
  });
});
