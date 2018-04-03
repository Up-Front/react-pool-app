const enrichMiddleware = store => next => action => {
  //console.log('store', store.getState().firebase.data);

  //store = Object.assign({}, store, { a: 'b' });
  next(action);
};

export default enrichMiddleware;
