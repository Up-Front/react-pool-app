import { database } from './../store';
import matchModel from './../models/matches';

// set match
//the match also needs to be added to the 2 users
export const addMatch = users => {
  const ref = database.ref('/');
  const matchId = database.ref('/matches').push().key;

  const model = matchModel({
    competitors: users
  });
  let updateData = {};
  updateData[`matches/${matchId}`] = model;
  users.forEach(userId => {
    updateData[`users/${userId}/matches/${matchId}`] = true;
  });
  return ref.update(updateData, function(error) {
    if (error) {
      console.log('Error updating data:', error);
    }
  });
};

export const declareWinner = (matchId, match, winner, declarer) => {
  const winners = Object.assign({}, match.winners, {
    [declarer.uid]: winner.uid
  });
  match = Object.assign({}, match, { winners });
  const { competitors, ...update } = setMatchStatus(matchId, match);
  return database.ref(`/matches/${matchId}`).update(update);
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
  return ref.update(updateData, function(error) {
    if (error) {
      console.log('Error updating data:', error);
    }
  });
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
      finishedAt: new Date().getTime()
    });
  } else {
    return Object.assign({}, match, {
      isContested: true,
      winner: null,
      finishedAt: null
    });
  }
};
