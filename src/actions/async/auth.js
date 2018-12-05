import { parseToken } from '../../services/auth'
import { logIn as logInSync, logOut as logOutSync } from '../sync/auth.js'

export const logIn = (token) => {
  return function (dispatch) {
    dispatch(logOutSync())
    return parseToken(token).then((authData) => {
      dispatch(logInSync(authData))
    }).catch((error) => {
      // in a more complete example, this would dispatch an error action
      return error
    })
  }
}

export const logOut = () => {
  return function (dispatch, getState, api) {
    const { auth: { token } } = getState()

    return api.logOut(token).then((result) => {
      const { status } = result
      if (status === 200) {
        dispatch(logOutSync(token))
      }

      return status
    }).catch((error) => {
      // in a more complete example, this would dispatch an error action
      return error
    })
  }
}
