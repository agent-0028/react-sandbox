import jwtDecode from './jwt'

export const parseToken = (token) => {
  return new Promise((resolve, reject) => {
    const { name } = jwtDecode(token)
    const authData = { token, name }
    resolve(authData)
  })
}
