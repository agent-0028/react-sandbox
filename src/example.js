import React from 'react'
import PropTypes from 'prop-types'

import './example.css'
import greenHeart from './Emojione_1F49A.svg'

import withStateAndHandlers from './exampleContainer'
import { BUTTON_TEXT, LOG_IN_BUTTON_TEXT, LOG_OUT_BUTTON_TEXT } from './constants'

const Example = (props) => {
  const {
    onButtonClick,
    loggedInStatusMessage,
    showLogInButton,
    showLogOutButton,
    onLogInClick,
    onLogOutClick,
    numHearts
  } = props
  return (
    <div className="example">
      <header className="example-header">
        <h3>Example Component</h3>

        <div className="green-hearts" data-jest="hearts">{ renderHearts(numHearts) }</div>

        <button className="add-hearts" data-jest="add-hearts-button" onClick={onButtonClick}>{BUTTON_TEXT}</button>
        <div className="logged-in-status-message" data-jest="logged-in-status-message">
          {loggedInStatusMessage}
        </div>
        { showLogInButton ? <button className="log-in" data-jest="log-in-button" onClick={onLogInClick}>{LOG_IN_BUTTON_TEXT}</button> : null }
        { showLogOutButton ? <button className="log-out" data-jest="log-out-button" onClick={onLogOutClick}>{LOG_OUT_BUTTON_TEXT}</button> : null }
      </header>
    </div>
  )
}

const renderHearts = (numHearts = 0) => ([...Array(numHearts)].map((_, index) => {
  return (<img src={greenHeart} key={index} className="green-heart" data-jest="green-heart" alt="green heart" />)
}))

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
