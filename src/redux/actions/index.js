import { setToken } from '../../services/localstorage';
import fetchAPI from '../../services/trivia';
// ACTIONS TYPES

export const SET_USER = 'SET_USER';
export const SET_SCORE = 'SET_SCORE';
export const RESET_GAME = 'RESET_GAME';
const DEFAULT_SCORE = 10;

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
// Salve no LocalStorage o token recebido utilizando a chave token

export const TRIVIA_FETCHING = 'TRIVIA_FETCHING';
export const TRIVIA_SUCCESS = 'TRIVIA_SUCCESS';
export const TRIVIA_ERROR = 'TRIVIA_ERROR';

export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const SET_TYPE = 'SET_TYPE';

// ACTIONS CREATORS

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setScore = (timer, difficulty) => ({
  type: SET_SCORE,
  payload: DEFAULT_SCORE + timer * difficulty,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const successFetchingToken = (token) => ({
  type: TOKEN_SUCCESS,
  payload: token,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const { token } = await fetchAPI('https://opentdb.com/api_token.php?command=request');
    setToken(token);
    dispatch(successFetchingToken(token));
  } catch (error) {
    console.log(error);
  }
};

const startFetchingTrivia = () => ({
  type: TRIVIA_FETCHING,
});

export const successFetchingTrivia = (trivia) => ({
  type: TRIVIA_SUCCESS,
  payload: trivia,
});

const errorFetchingTrivia = (error) => ({
  type: TRIVIA_ERROR,
  payload: error,
});

export const fetchTrivia = (token, { category, difficulty, type }) => (
  async (dispatch) => {
    dispatch(startFetchingTrivia());
    const url = (category + difficulty + type === '')
      ? `https://opentdb.com/api.php?amount=5&token=${token}`
      : `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}`;
    try {
      const trivia = await fetchAPI(url);
      dispatch(successFetchingTrivia(trivia));
    } catch (error) {
      dispatch(errorFetchingTrivia(error));
    }
  }
);

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  payload: difficulty,
});

export const setType = (type) => ({
  type: SET_TYPE,
  payload: type,
});
