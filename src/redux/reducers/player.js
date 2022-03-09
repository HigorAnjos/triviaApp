import { SET_ASSERTIONS, SET_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SET_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
