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
  let updateData = {};
  updateData[`matches/${matchId}`] = model;

  //also update the match data for the competitors
  users.forEach(userId => {
    updateData[`users/${userId}/matches/${matchId}`] = true;
  });

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
  let updateData = {};
  updateData[`matches/${matchId}`] = null;
  Object.values(match.competitors).map(competitor => {
    updateData[`users/${competitor.uid}/matches/${matchId}`] = null;
  });

  testt();
  return ref.update(updateData, function(error) {
    if (error) {
      console.log('Error updating data:', error);
    }
  });
};

export const testt = () => {};

export const updateWinnerData = (matchId, match) => {
  let updateData = {};
  updateData[`matches/${matchId}/winner`] = match.winner;
  updateData[`matches/${matchId}/finishedAt`] = match.finishedAt;

  Object.values(match.competitors).map(competitor => {
    let result;
    let streak = competitor.streak || '';
    if (match.winner === competitor.uid) {
      result = 'W';
    } else {
      result = 'L';
    }

    updateData[`users/${competitor.uid}/matches/${matchId}`] = result;
    updateData[`users/${competitor.uid}/streak`] = competitor.streak =
      streak + result;
  });

  return updateData;
};

export const setMatchStatus = (matchId, match) => {
  let winner;
  let first = true;
  let isContested = false;

  // if there are not the same amount of winners as competitors than there is nothing to do
  if (
    Object.keys(match.winners).length !== Object.keys(match.competitors).length
  ) {
    return match;
  }
  Object.values(match.winners).forEach(value => {
    if (first) {
      winner = value;
      first = false;
    }
    if (winner !== value) {
      // a contested result
      isContested = true;
    }
  });

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
