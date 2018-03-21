import Constants from './../components/shared/constants';

//find the head2head score of the 2 competitors
export const calcHead2Head = (competitorA, competitorB) => {
  const streak = competitorA.results && competitorA.results[competitorB.uid];
  let wins = 0;
  let losses = 0;
  if (streak) {
    wins = (streak.match(new RegExp(Constants.winValue, 'g')) || []).length;
    losses = (streak.match(new RegExp(Constants.loseValue, 'g')) || []).length;
  }
  return `${wins}-${losses}`;
};
