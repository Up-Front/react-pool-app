import { database } from './../store';
import matchModel from './../models/matches';

// set match
export const addMatch = (userA, userB) => {
    let key = database.ref('/matches').push().key;
    let model = matchModel({
        userA: userA.uid,
        userB: userB.uid
    });
    return database.ref('/matches/' + key).set(model);
}
