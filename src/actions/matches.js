import { database } from './../store';
import matchModel from './../models/matches';

// set match
export const addMatch = (users) => {
    let key = database.ref('/matches').push().key;
    let model = matchModel({
        competitors: users
    });
    return database.ref(`/matches/${key}`).set(model);
}

export const declareWinner = (matchId, winner, declarer) => {
    return database.ref(`/matches/${matchId}/winners/${declarer.uid}`).set(winner.uid);
}

export const removeMatch = (matchId) => {
    return database.ref(`/matches/${matchId}`).remove();
}
