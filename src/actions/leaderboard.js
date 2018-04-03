import { database } from './../store';
import { getUserData } from './competitors';
import { getStartOfWeek } from './../components/shared/utils/time';
import constants from './../components/shared/constants';

export const calculateLeaderBoard = () => {
  getUserData().then(snapshot => {
    const users = snapshot.val();
    const updateData = calculateLeaderBoardData(Object.entries(users));
    return updateDataRef(updateData, error => {
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
      const ratingA = a[1].eloRating || constants.DEFAULTELORATING;
      const ratingB = b[1].eloRating || constants.DEFAULTELORATING;
      return -(ratingA - ratingB);
    })
    .reduce((previous, user, index) => {
      const rating = user[1].eloRating || constants.DEFAULTELORATING;

      previous[`users/${user[0]}/rank`] = index + 1;
      previous[`rankings/${startOfWeek.getTime()}/${user[0]}`] = {
        ranking: index + 1,
        eloRating: rating,
      };
      return previous;
    }, {});
};

const updateDataRef = (data, cb) => {
  return database.ref('/').update(data, cb());
};
