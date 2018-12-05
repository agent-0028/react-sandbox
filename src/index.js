import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import './skeleton.css'

import api from './services/api'
import reducers from './reducers'
import Example from './example'

const store = createStore(
  reducers,
  {},
  applyMiddleware(
    thunk.withExtraArgument(api)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('root')
)
