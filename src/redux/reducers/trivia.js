import { TRIVIA_ERROR, TRIVIA_FETCHING, TRIVIA_SUCCESS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  error: undefined,
  questions: [],
  responseCode: 0,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TRIVIA_FETCHING:
    return {
      ...state,
      isFetching: true,
    };
  case TRIVIA_SUCCESS:
    return {
      ...state,
      isFetching: false,
      questions: action.payload.results,
      responseCode: action.payload.response_code,
    };
  case TRIVIA_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default trivia;
