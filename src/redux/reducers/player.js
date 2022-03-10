import { RESET_GAME, SET_SCORE, SET_USER } from '../actions';

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
      gravatarEmail: action.payload.gravatarEmail,
    };
  case SET_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  case RESET_GAME:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
