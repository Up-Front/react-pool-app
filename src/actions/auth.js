import firebase from 'firebase';

export const loginUser = () => {
  console.log(firebase);
  firebase.login({ provider: 'google', type: 'popup' });
};

export const logoutUser = () => {
  firebase.logout();
};
