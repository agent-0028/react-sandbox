import React from 'react'
import PropTypes from 'prop-types'
import withStateAndHandlers from './exampleContainer'
import { BUTTON_TEXT, LOG_IN_BUTTON_TEXT, LOG_OUT_BUTTON_TEXT } from './constants'

function Example (props) {
  const {
    onButtonClick,
    loggedInStatusMessage,
    showLogInButton,
    showLogOutButton,
    onLogInClick,
    onLogOutClick
  } = props
  return (
    <div>
      <h3>Example Component</h3>
      <button onClick={onButtonClick}>{BUTTON_TEXT}</button>
      <div className="message">
        {loggedInStatusMessage}
      </div>
      { showLogOutButton ? <button onClick={onLogOutClick}>{LOG_OUT_BUTTON_TEXT}</button> : null }
      { showLogInButton ? <button onClick={onLogInClick}>{LOG_IN_BUTTON_TEXT}</button> : null }
    </div>
  )
}

Example.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  loggedInStatusMessage: PropTypes.string.isRequired,
  showLogInButton: PropTypes.bool.isRequired,
  showLogOutButton: PropTypes.bool.isRequired,
  onLogInClick: PropTypes.func.isRequired,
  onLogOutClick: PropTypes.func.isRequired
}

export { Example }
export default withStateAndHandlers(Example)
