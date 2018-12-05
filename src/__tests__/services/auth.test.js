describe('Example', () => {
  let subject, jwt

  beforeEach(() => {
    jwt = td.replace('../../services/jwt')

    subject = require('../../services/auth').parseToken
  })

  it('parses', () => {
    const token = 'some-token'
    const name = 'Janet Dough'

    td.when(jwt.default(token)).thenReturn({
      name,
      something: 'else',
      anything: 'really'
    })

    const promise = subject(token)

    return promise.then((result) => {
      expect(result).toEqual({ name, token })
    })
  })
})
