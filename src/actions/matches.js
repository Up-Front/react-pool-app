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

export const declareWinner = (matchId, match, winner, declarer) => {
    if (!match.winners) {
        match.winners = {};
    }
    let winners = Object.assign({}, match.winners, { [declarer.uid]: winner.uid });
    match = Object.assign({}, match, { winners });
    const { competitors, ...update } = setMatchStatus(matchId, match);
    return database.ref(`/matches/${matchId}`).update(update);
}

export const removeMatch = (matchId) => {
    return database.ref(`/matches/${matchId}`).remove();
}

export const setMatchStatus = (matchId, match) => {
    let winner;
    let first = true;
    let isContested = false;

    if (match) {
        if (!match.winners) {
            match.winners = {};
        }
        // if there are not the same amount of winners as competitors than there is nothing to do
        if (Object.keys(match.winners).length !== Object.keys(match.competitors).length) {
            return match;
        }



        Object.keys(match.winners).forEach((key) => {
            if (first) {
                winner = match.winners[key];
                first = false;
            }
            if (winner !== match.winners[key]) {
                // a contested result\
                isContested = true;
            }
        });

        if (!isContested) {
            return Object.assign({}, match, { isContested: false, winner, finishedAt: new Date().getTime() });
        } else {
            return Object.assign({}, match, { isContested: true, winner: null, finishedAt: null });
        }


    }

}