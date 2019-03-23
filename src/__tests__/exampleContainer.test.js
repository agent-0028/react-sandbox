import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

describe('exampleContainer with Redux', () => {
  let subject, SomePresentationalComponent, ContainerComponent, initialState, store

  beforeEach(() => {
    initialState = {
      auth: {
        loggedIn: true,
        token: 'some-token'
      }
    }
    const mockStore = configureStore()
    store = mockStore(initialState)

    subject = require('../exampleContainer').default
    SomePresentationalComponent = (props) => (<div>Presentational Component</div>)

    ContainerComponent = subject(SomePresentationalComponent)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <ContainerComponent />
      </Provider>, div)
  })
})
