describe('auth async actions', () => {
  let subject, token, mockDispatch, mockGetState, mockAuthService, mockApiService, mockSyncAuthActions

  beforeEach(() => {
    token = 'a token'

    mockDispatch = td.func('dispatch')
    mockGetState = td.func('getState')
    mockAuthService = td.replace('../../../services/auth')
    mockApiService = td.replace('../../../services/api')
    mockSyncAuthActions = td.replace('../../../actions/sync/auth')
  })

  describe('logIn', () => {
    beforeEach(() => {
      subject = require('../../../actions/async/auth').logIn
    })

    it('is a thunk (returns a function)', () => {
      expect(subject()).toEqual(expect.any(Function))
    })

    it(`dispatches the log out action,
        parses the token and then
        dipatches the log in action with auth data`, () => {
      td.when(mockSyncAuthActions.logOut()).thenReturn('log out action')
      td.when(mockAuthService.parseToken(token)).thenResolve('auth data')
      td.when(mockSyncAuthActions.logIn('auth data')).thenReturn('log in action')

      const asyncAction = subject(token)

      const captor = td.matchers.captor()

      return asyncAction(mockDispatch).then((result) => {
        td.verify(mockDispatch(captor.capture()))
        expect(captor.values[0]).toEqual('log out action')
        expect(captor.values[1]).toEqual('log in action')
      })
    })

    context('when there is an error parsing the token', () => {
      it(`
          dispatches the log out action,
          does not dispatch the log in action and
          resolves with the error`, () => {
        td.when(mockSyncAuthActions.logOut()).thenReturn('log out action')
        td.when(mockAuthService.parseToken(token)).thenReject(new Error('some error'))

        const asyncAction = subject(token)

        const captor = td.matchers.captor()

        return asyncAction(mockDispatch).then(
          (result) => {
            td.verify(mockDispatch(captor.capture()))
            expect(captor.values[0]).toEqual('log out action')
            expect(captor.values[1]).not.toBeDefined()
            expect(result instanceof Error).toEqual(true)
            expect(result.message).toEqual('some error')
          },
          () => {
            fail('Errors should be caught by the action.')
          }
        )
      })
    })
  })

  describe('logOut', () => {
    beforeEach(() => {
      subject = require('../../../actions/async/auth').logOut
    })

    it('is a thunk (returns a function)', () => {
      expect(subject()).toEqual(expect.any(Function))
    })

    it(`
        gets the token from state,
        tells the API service to log out with the token then
        dispatches the log out method with the token and
        resolves with the status`, () => {
      td.when(mockGetState()).thenReturn({ auth: { token } })
      td.when(mockApiService.default.logOut(token)).thenResolve({ status: 200 })
      td.when(mockSyncAuthActions.logOut(token)).thenReturn('log out action')

      const asyncAction = subject()

      const captor = td.matchers.captor()

      return asyncAction(mockDispatch, mockGetState, mockApiService.default).then((result) => {
        td.verify(mockDispatch(captor.capture()))
        expect(captor.values[0]).toEqual('log out action')
        expect(result).toEqual(200)
      })
    })

    context('when there is an error parsing the token', () => {
      it(`
          gets the token from state,
          does not dispatch the log out action and
          resolves with the error`, () => {
        td.when(mockGetState()).thenReturn({ auth: { token } })
        td.when(mockApiService.default.logOut(token)).thenReject(new Error('Some other error'))

        const asyncAction = subject()

        return asyncAction(mockDispatch, mockGetState, mockApiService.default).then(
          (result) => {
            td.verify(mockDispatch(td.matchers.anything()), { times: 0, ignoreExtraArgs: true })
            expect(result instanceof Error).toEqual(true)
            expect(result.message).toEqual('Some other error')
          },
          () => {
            fail('Errors should be caught by the action.')
          }
        )
      })
    })
  })
})
