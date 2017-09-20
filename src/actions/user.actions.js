import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';
import { history } from '../store';

export const userActions = {
    signIn,
    signOut,
    register,
    postMessage,
    onListen
};

function signIn(email, password) {
  return dispatch => {
    userService.signIn(email, password)
    .then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  //function request(user) { return { type: userConstants.LOGIN_REQUEST } }
  function success(user) { return { type: 'LOGIN_SUCCESS' } }
  function failure(error) { return { type: 'LOGIN_FAILURE', error } }
}

function signOut() {
  return dispatch => {
    userService.signOut()
    .then(
      user => {
        dispatch(success());
        history.push('/login');
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function success() { return { type: 'LOGOUT' } }
  function failure(error) { return { type: 'LOGOUT_FAILURE', error } }
}

function register(email, password) {
  return dispatch => {
    userService.register(email, password)
    .then(
      user => {
        dispatch(success());
        history.push('/login');
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  //function request(user) { return { type: userConstants.LOGIN_REQUEST } }
  function success() { return { type: 'REGISTER_SUCCESS' } }
  function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}

function postMessage(message) {
  return dispatch => {
    userService.postMessage(message)
    .then(
      user => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  //function request(user) { return { type: userConstants.LOGIN_REQUEST } }
  function success() { return { type: 'POST_MSG_SUCCESS' } }
  function failure(error) { return { type: 'POST_MSG_FAILURE', error } }
}

function onListen(callback) {
  return dispatch => {
    userService.onListen(callback);
  };
}
