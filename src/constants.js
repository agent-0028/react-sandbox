import deepFreeze from 'deep-freeze';

export const AUTH_DEFAULT_STATE = {
  loggedIn: false,
  token: ''
};
deepFreeze(AUTH_DEFAULT_STATE);
