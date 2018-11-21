import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

describe('exampleContainer with Redux', () => {
  let subject, SomeDumbComponent, WrappedComponent, initialState, store, mockLogIn, mockLogOut

  beforeEach(() => {
    jest.resetModules()

    window.alert = jest.fn()

    initialState = {
      auth: {
        loggedIn: true,
        token: 'some-token'
      }
    }
    const mockStore = configureStore()
    store = mockStore(initialState)

    mockLogIn = jest.fn(() => {
      return {
        type: 'SOME_TYPE'
      }
    })
    mockLogOut = jest.fn(() => {
      return {
        type: 'SOME_OTHER_TYPE'
      }
    })
    const mockAuthActionsModule = {
      logIn: mockLogIn,
      logOut: mockLogOut
    }
    jest.setMock('../actions/auth', mockAuthActionsModule)

    subject = require('../exampleContainer').default
    SomeDumbComponent = function (props) {
      return (<div>Dumb Component</div>)
    }
    WrappedComponent = subject(SomeDumbComponent)
  })

  it('maps state to props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <WrappedComponent />
      </Provider>
    )
    const wrappedComponentProps = wrapper.find('ExampleContainer').props()

    expect(wrappedComponentProps.loggedIn).toEqual(initialState.auth.loggedIn)
    expect(wrappedComponentProps.token).toEqual(initialState.auth.token)
  })

  it('maps dispatch to props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <WrappedComponent />
      </Provider>
    )
    const wrappedComponentProps = wrapper.find('ExampleContainer').props()

    wrappedComponentProps.logIn()
    wrappedComponentProps.logOut()

    expect(mockLogIn).toHaveBeenCalledTimes(1)
    expect(mockLogOut).toHaveBeenCalledTimes(1)
  })
})
