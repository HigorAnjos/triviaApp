import { RESET_GAME, TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_SUCCESS:
    return action.payload;
  case RESET_GAME:
    return '';
  default:
    return state;
  }
};

export default token;
