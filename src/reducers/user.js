import { STORE_USER } from '../actions';

const user = (state = [], action) => {
  switch (action.type) {
    case STORE_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;
