import deepFreeze from 'deep-freeze'

export const AUTH_DEFAULT_STATE = {
  loggedIn: false,
  token: ''
}
deepFreeze(AUTH_DEFAULT_STATE)

export const BUTTON_TEXT = 'Click for green hearts!'
export const LOG_IN_BUTTON_TEXT = 'Log In'
export const LOG_OUT_BUTTON_TEXT = 'Log Out'
export const LOGGED_OUT_TEXT = 'You are logged out.'
export const JUST_LOGGED_OUT_TEXT = 'You JUST logged out!'
export const LOGGED_IN_TEXT_PRE = 'You are logged in, and your token is: '
