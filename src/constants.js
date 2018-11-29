import deepFreeze from 'deep-freeze'

export const AUTH_DEFAULT_STATE = {
  loggedIn: false,
  token: '',
  name: ''
}
deepFreeze(AUTH_DEFAULT_STATE)

// this might come from an OAuth callback
export const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gSmFjb2IgSmluZ2xlaGVpbWVyIFNjaG1pZHQiLCJpYXQiOjE1MTYyMzkwMjJ9.gaR2pP5JwITBeEfL8N5uLWtJDG29g_BtU5uhM2L8mjQ'

export const BUTTON_TEXT = 'Click for green hearts!'
export const LOG_IN_BUTTON_TEXT = 'Log In'
export const LOG_OUT_BUTTON_TEXT = 'Log Out'
export const LOGGED_OUT_TEXT = 'You are logged out.'
export const JUST_LOGGED_OUT_TEXT = 'You JUST logged out!'
export const LOGGED_IN_TEXT_PRE = 'You are logged in, and your name is: '
