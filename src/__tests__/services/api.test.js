describe('API service', () => {
  let subject

  beforeEach(() => {
    subject = require('../../services/api').default
  })

  it('resolves with status OK', () => {
    const token = 'some-token'

    const promise = subject.logOut(token)

    return promise.then((result) => {
      expect(result).toEqual({ status: 200 })
    })
  })
})
