import React from 'react'
import PropTypes from 'prop-types'

import './example.css'
import logo from './td-pride-logo.svg'
import greenHeart from './Emojione_1F49A.svg'

import withStateAndHandlers from './exampleContainer'
import { BUTTON_TEXT, LOG_IN_BUTTON_TEXT, LOG_OUT_BUTTON_TEXT } from './constants'

function Example (props) {
  const {
    onButtonClick,
    loggedInStatusMessage,
    showLogInButton,
    showLogOutButton,
    onLogInClick,
    onLogOutClick,
    numHearts
  } = props
  const hearts = renderHearts(numHearts)
  return (
    <div className="example">
      <header className="example-header">
        <img src={logo} className="td-logo" alt="test double logo" />
        <div className="hearts">{hearts}</div>
        <h3>Example Component</h3>

        <button className="add-hearts" onClick={onButtonClick}>{BUTTON_TEXT}</button>
        <div className="logged-in-status-message">
          {loggedInStatusMessage}
        </div>
        { showLogInButton ? <button className="log-in" onClick={onLogInClick}>{LOG_IN_BUTTON_TEXT}</button> : null }
        { showLogOutButton ? <button className="log-out" onClick={onLogOutClick}>{LOG_OUT_BUTTON_TEXT}</button> : null }
      </header>
    </div>
  )
}

function renderHearts (numHearts = 0) {
  const hearts = []
  for (let index = 1; index <= numHearts; index++) {
    hearts.push(<img src={greenHeart} key={index} className="green-heart" alt="green heart" />)
  }
  return hearts
}

Example.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  loggedInStatusMessage: PropTypes.string.isRequired,
  showLogInButton: PropTypes.bool.isRequired,
  showLogOutButton: PropTypes.bool.isRequired,
  onLogInClick: PropTypes.func.isRequired,
  onLogOutClick: PropTypes.func.isRequired,
  numHearts: PropTypes.number.isRequired
}

export { Example }
export default withStateAndHandlers(Example)
