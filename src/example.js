import React from 'react';
import PropTypes from 'prop-types';
import withStateAndHandlers from './exampleContainer';

function Example (props) {
  const {
    onButtonClick,
    buttonText,
    loggedInStatusMessage,
    showLogInButton,
    showLogOutButton,
    onLogInClick,
    onLogOutClick
  } = props;
  return (
    <div>
      <h3>Example Component</h3>
      <button onClick={onButtonClick}>{buttonText}</button>
      <div>
        {loggedInStatusMessage}
      </div>
      { showLogOutButton ? <button onClick={onLogOutClick}>Log Out</button> : null }
      { showLogInButton ? <button onClick={onLogInClick}>Log In</button> : null }
    </div>
  );
}

Example.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  loggedInStatusMessage: PropTypes.string.isRequired,
  showLogOutButton: PropTypes.bool.isRequired,
  showLogInButton: PropTypes.bool.isRequired,
  onLogInClick: PropTypes.bool.isRequired,
  onLogOutClick: PropTypes.func.isRequired
};

export { Example };
export default withStateAndHandlers(Example);
