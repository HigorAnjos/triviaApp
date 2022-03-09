// ACTIONS TYPES
export const SET_USER = 'SET_USER';

export const TOKEN_FETCHING = 'TOKEN_FETCHING';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
// Salve no LocalStorage o token recebido utilizando a chave token

export const TOKEN_ERROR = 'TOKEN_ERROR';

export const TRIVIA_FETCHING = 'TRIVIA_FETCHING';
export const TRIVIA_SUCCESS = 'TRIVIA_SUCCESS';
export const TRIVIA_ERROR = 'TRIVIA_ERROR';

// ACTIONS CREATORS

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const fetchToken = () => async (dispatch) => {
  
} 
