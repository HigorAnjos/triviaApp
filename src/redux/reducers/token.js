import { TOKEN_ERROR, TOKEN_FETCHING, TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  error: undefined,
  value: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_FETCHING:
    return {
      ...state,
      isFetching: true,
    };
  case TOKEN_SUCCESS:
    return {
      ...state,
      isFetching: false,
      value: action.payload,
    };
  case TOKEN_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default token;
