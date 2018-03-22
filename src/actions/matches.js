import { database } from './../store';
import matchModel from './../models/matches';
import constants from './../components/shared/constants';
import { calculateLeaderBoard } from './leaderboard';

// set match
//the match also needs to be added to the 2 users
export const addMatch = users => {
  const ref = database.ref('/');
  const matchId = database.ref('/matches').push().key;

  const model = matchModel({
    competitors: users,
  });

  //also update the match data for the competitors
  const updateData = users.reduce(
    (previous, competitorId) => {
      previous[`users/${competitorId}/matches/${matchId}`] = true;
      return previous;
    },
    { [`matches/${matchId}`]: model }
  );

  return ref.update(updateData, function(error) {
    if (error) {
      console.log('Error updating data:', error);
    }
  });
};

// set the winner of the match
// also set the winner/loser with the competitor matches
export const declareWinner = (matchId, match, winner, declarer) => {
  const ref = database.ref('/');
  let updateData = {};
  const winners = Object.assign({}, match.winners, {
    [declarer.uid]: winner.uid,
  });
  match = Object.assign({}, match, { winners });
  match = setMatchStatus(matchId, match);

  updateData[`matches/${matchId}/winners`] = match.winners;
  updateData[`matches/${matchId}/isContested`] = match.isContested;

  if (match.winner) {
    updateData = Object.assign(
      {},
      updateData,
      updateWinnerData(matchId, match)
    );
  }

  return ref.update(updateData, function(error) {
    if (error) {
      console.log('Error updating data:', error);
    }
    calculateLeaderBoard();
  });
};

//the match needs to be removed from /matches
//and the different users
export const removeMatch = (matchId, match) => {
  const ref = database.ref('/');
  const updateData = Object.values(match.competitors).reduce(
    (previous, competitor) => {
      previous[`users/${competitor.uid}/matches/${matchId}`] = null;
      return previous;
    },
    { [`matches/${matchId}`]: null }
  );

  return ref.update(updateData, function(error) {
    if (error) {
      console.log('Error updating data:', error);
    }
  });
};

export const updateWinnerData = (matchId, match) => {
  const updateData = Object.values(match.competitors).reduce(
    (previous, competitor) => {
      let result;
      const otherCompetitor = findOtherCompetitor(
        competitor,
        Object.values(match.competitors)
      );
      const otherCompetitorResults =
        competitor.results && competitor.results[otherCompetitor.uid];

      if (match.winner === competitor.uid) {
        result = constants.WINVALUE;
      } else {
        result = constants.LOSEVALUE;
      }

      previous[
        `users/${competitor.uid}/results/${otherCompetitor.uid}`
      ] = increaseStreak(otherCompetitorResults, result);
      previous[`users/${competitor.uid}/streak`] = increaseStreak(
        competitor.streak,
        result
      );
      previous[`users/${competitor.uid}/eloRating`] = setEloRating(
        result,
        competitor,
        match.competitors
      );
      return previous;
    },
    {
      [`matches/${matchId}/winner`]: match.winner,
      [`matches/${matchId}/finishedAt`]: match.finishedAt,
    }
  );

  return updateData;
};

export const setMatchStatus = (matchId, match) => {
  // if there are not the same amount of winners as competitors than there is nothing to do
  if (
    Object.keys(match.winners).length !== Object.keys(match.competitors).length
  ) {
    return match;
  }
  const { winner, isContested } = checkWinner(match.winners);

  if (!isContested) {
    return Object.assign({}, match, {
      isContested: false,
      winner,
      finishedAt: new Date().getTime(),
    });
  } else {
    return Object.assign({}, match, {
      isContested: true,
      winner: null,
      finishedAt: null,
    });
  }
};

export const checkWinner = winnerVotes => {
  let first = true;
  let winner;
  let isContested = false;
  Object.values(winnerVotes).forEach(value => {
    if (first) {
      winner = value;
      first = false;
    }
    if (winner !== value) {
      // a contested result
      isContested = true;
      winner = null;
    }
  });

  return {
    winner,
    isContested,
  };
};

/**
 * https://en.wikipedia.org/wiki/Elo_rating_system
 * https://metinmediamath.wordpress.com/2013/11/27/how-to-calculate-the-elo-rating-including-example/
 * @param {*} userResult
 * @param {*} user
 * @param {*} competitors
 */
export const setEloRating = (userResult, user, competitors) => {
  const competitor = findOtherCompetitor(user, Object.values(competitors));

  const userRating = user.eloRating || constants.DEFAULTELORATING;
  const competitorRating = competitor.eloRating || constants.DEFAULTELORATING;
  const expectedScore = userRating / (userRating + competitorRating);

  if (userResult === constants.WINVALUE) {
    return Math.round(userRating + constants.ELOCONSTANT * (1 - expectedScore));
  } else {
    return Math.round(userRating + constants.ELOCONSTANT * (0 - expectedScore));
  }
};

export const increaseStreak = (streak, result) => {
  streak = streak || '';
  return streak + result;
};

export const findOtherCompetitor = (user, competitors) =>
  competitors.filter(comp => comp.uid !== user.uid).shift();
