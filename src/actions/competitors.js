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
