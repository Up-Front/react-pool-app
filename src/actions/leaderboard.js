import { database } from './../store';
import { getUserData } from './competitors';
import { getStartOfWeek } from './../components/shared/utils/time';
import constants from './../components/shared/constants';

export const calculateLeaderBoard = users => {
  getUserData().then(snapshot => {
    const users = snapshot.val();

    const updateData = calculateLeaderBoardData(Object.entries(users));
    updateDataRef(updateData, error => {
      if (error) {
        console.log('Error updating data:', error);
      }
    });
  });
};

export const calculateLeaderBoardData = users => {
  const startOfWeek = getStartOfWeek();
  return users
    .sort((a, b) => {
      const ratingA = a.eloRating || constants.DEFAULTELORATING;
      const ratingB = b.eloRating || constants.DEFAULTELORATING;
      return -(ratingA - ratingB);
    })
    .reduce((previous, user, index) => {
      const rating = user.eloRating || constants.DEFAULTELORATING;
      previous[`users/${user.uid}/rank`] = index + 1;
      previous[`rankings/${startOfWeek.getTime()}/${user.uid}`] = {
        ranking: index + 1,
        eloRating: rating,
      };
      return previous;
    }, {});
};

const updateDataRef = (data, cb) => {
  database.ref('/').update(data, cb());
};
