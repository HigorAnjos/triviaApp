import { SET_CATEGORY, SET_DIFFICULTY, SET_TYPE } from '../actions';

const initialState = {
  category: '',
  difficulty: '',
  type: '',
};

const configs = (state = initialState, action) => {
  switch (action.type) {
  case SET_CATEGORY:
    return {
      ...state,
      category: action.payload,
    };
  case SET_DIFFICULTY:
    return {
      ...state,
      difficulty: action.payload,
    };
  case SET_TYPE:
    return {
      ...state,
      type: action.payload,
    };
  default:
    return state;
  }
};

export default configs;
