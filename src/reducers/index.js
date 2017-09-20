import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth.reducer';
import register from './register.reducer';
import alert from './alert.reducer';
import chat from './chat.reducer';

export default combineReducers({
  routing: routerReducer,
  auth,
  register,
  alert,
  chat
})
