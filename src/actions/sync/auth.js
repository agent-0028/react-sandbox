export const logIn = (authData) => {
  const { token, name } = authData
  return {
    type: 'LOG_IN',
    token,
    name
  }
}

export const logOut = () => ({
  type: 'LOG_OUT'
})
