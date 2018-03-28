import { database } from './../store';
import constants from './../components/shared/constants';

//find the head2head score of the 2 competitors
export const calcHead2Head = (competitorA, competitorB) => {
  const streak = competitorA.results && competitorA.results[competitorB.uid];
  let wins = 0;
  let losses = 0;
  if (streak) {
    wins = (streak.match(new RegExp(constants.WINVALUE, 'g')) || []).length;
    losses = (streak.match(new RegExp(constants.LOSEVALUE, 'g')) || []).length;
  }
  return `${wins}-${losses}`;
};

export const getUserData = () => {
  return database.ref('/users/').once('value');
};

export const enrichCompetitor = ({ competitor, presence, rankings }) => {
  competitor.currentRanking = getRanking(
    competitor,
    rankings,
    constants.CURRENT_RANKING_INDEX
  );
  competitor.previousRanking = getRanking(
    competitor,
    rankings,
    constants.PREVIOUS_RANKING_INDEX
  );
  if (presence) {
    competitor.online = presence[competitor.uid];
  }
  return Object.assign({}, competitor);
};

const getRanking = (competitor, rankings, rankingIndex) => {
  if (rankings) {
    const setRankings = rankings && rankings[rankingIndex];

    if (setRankings) {
      return setRankings.value && setRankings.value[competitor.uid];
    }
  }
  return {};
};

/**
 * calculate the winning / losing streak of a competitor
 */
export const calculateStreak = competitor => {
  let streak = 1;
  const competitorStreak = competitor.streak || '';
  let lastResult;

  competitorStreak.split('').reduceRight((prev, current) => {
    if (lastResult && lastResult !== current) {
      return null;
    }
    if (!lastResult) {
      lastResult = current;
    }
    if (current === prev && lastResult === current) {
      streak++;
      return current;
    }
    return null;
  });
  console.log(streak);
  return streak;
};

/**
 * set the victoryName of a match,
 * this depends on the winning - streak length of the winner
 */
export const setVictoryName = streak => {
  if (streak >= 10) {
    return 'godlike';
  } else if (streak >= 6) {
    return 'rampage';
  } else if (streak >= 3) {
    return 'dominating';
  }
  return 'victory';
};

export const increaseStreak = (streak, result) => {
  streak = streak || '';
  return streak + result;
};
