import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { FAKE_TOKEN } from '../constants'

describe('exampleContainer with Redux', () => {
  let subject, SomeDumbComponent, ContainerComponent, initialState, store, authActions

  beforeEach(() => {
    initialState = {
      auth: {
        loggedIn: true,
        token: 'some-token'
      }
    }
    const mockStore = configureStore()
    store = mockStore(initialState)

    authActions = td.replace('../actions/async/auth')

    subject = require('../exampleContainer').default
    SomeDumbComponent = (props) => (<div>Dumb Component</div>)

    ContainerComponent = subject(SomeDumbComponent)
  })

  it('maps state to props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ContainerComponent />
      </Provider>
    )
    const containerComponentProps = wrapper.find('ExampleContainer').props()

    expect(containerComponentProps.loggedIn).toEqual(initialState.auth.loggedIn)
    expect(containerComponentProps.token).toEqual(initialState.auth.token)
  })

  describe('actions', () => {
    let containerComponentProps
    beforeEach(() => {
      const wrapper = mount(
        <Provider store={store}>
          <ContainerComponent />
        </Provider>
      )

      containerComponentProps = wrapper.find('ExampleContainer').props()
    })
    it('maps dispatch of logIn to props', () => {
      td.when(authActions.logIn(FAKE_TOKEN)).thenReturn({
        type: 'SOME_ACTION'
      })

      containerComponentProps.logIn()

      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'SOME_ACTION'
      })
    })

    it('maps dispatch of logOut to props', () => {
      td.when(authActions.logOut()).thenReturn({
        type: 'SOME_OTHER_ACTION'
      })

      containerComponentProps.logOut()

      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'SOME_OTHER_ACTION'
      })
    })
  })
})
