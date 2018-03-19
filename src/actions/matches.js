import { database } from './../store';
import matchModel from './../models/matches';

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
      let streak = competitor.streak || '';
      if (match.winner === competitor.uid) {
        result = 'W';
      } else {
        result = 'L';
      }

      previous[`users/${competitor.uid}/matches/${matchId}`] = result;
      previous[`users/${competitor.uid}/streak`] = competitor.streak =
        streak + result;
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
