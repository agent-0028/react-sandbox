import { AUTH_DEFAULT_STATE } from '../constants'

const auth = (state = AUTH_DEFAULT_STATE, action) => {
  let newState = {}

  switch (action.type) {
    case 'LOG_IN':
      newState = {
        loggedIn: true,
        token: action.token,
        name: action.name
      }

      return { ...state, ...newState }
    case 'LOG_OUT':
      newState = {
        loggedIn: AUTH_DEFAULT_STATE.loggedIn,
        token: AUTH_DEFAULT_STATE.token,
        name: AUTH_DEFAULT_STATE.name
      }

      return { ...state, ...newState }
    default:
      return state
  }
}

export default auth
