const STORE_USER = 'store_user';

const storeUser = user => ({
  type: STORE_USER,
  user,
});

export { storeUser, STORE_USER };
