const api = {
  logOut: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('token is required'))
      }
      resolve({ status: 200 })
    })
  }
}

export default api
