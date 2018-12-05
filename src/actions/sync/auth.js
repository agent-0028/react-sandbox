export const logIn = (authData) => {
  const { token, name } = authData
  return {
    type: 'LOG_IN',
    token,
    name
  }
}

export const logOut = () => {
  return {
    type: 'LOG_OUT'
  }
}
