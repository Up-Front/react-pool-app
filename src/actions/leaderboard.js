import { database } from './../store';
import { getUserData } from './competitors';
import { getStartOfWeek } from './../components/shared/utils/time';
import constants from './../components/shared/constants';

export const calculateLeaderBoard = () => {
  const startOfWeek = getStartOfWeek();

  return getUserData().then(snapshot => {
    const users = snapshot.val();

    const updateData = Object.entries(users)
      .map(([uid, user]) => {
        user.uid = uid;
        return user;
      })
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

    return database.ref('/').update(updateData, function(error) {
      if (error) {
        console.log('Error updating data:', error);
      }
    });
  });
};
