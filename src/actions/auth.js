import firebase from 'firebase';

export const loginUser = () => {
  firebase.login({ provider: 'google', type: 'popup' });
};

export const logoutUser = () => {
  firebase.logout();
};
