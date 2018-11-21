import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import reducers from './reducers'
import Example from './example'

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('root')
)
