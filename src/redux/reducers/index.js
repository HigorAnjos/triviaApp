import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import trivia from './trivia';
import configs from './configs';

const rootReducer = combineReducers({
  player,
  token,
  trivia,
  configs,
});

export default rootReducer;
