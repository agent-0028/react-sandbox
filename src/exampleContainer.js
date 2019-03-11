import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logIn, logOut } from './actions/async/auth'
import { FAKE_TOKEN, LOGGED_OUT_TEXT, JUST_LOGGED_OUT_TEXT, LOGGED_IN_TEXT_PRE } from './constants'

const withHandlers = (ComponentToWrap) => {
  class ExampleContainer extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        loggedIn: false,
        clickCount: 0,
        loggedInStatusMessage: LOGGED_OUT_TEXT
      }

      this.onButtonClick = this.onButtonClick.bind(this)
    }

    static getDerivedStateFromProps (props, state) {
      const derivedState = { ...state }
      const { loggedIn, name } = props
      const justLoggedOut = (state.loggedIn && !loggedIn)

      if (justLoggedOut) {
        derivedState.loggedInStatusMessage = JUST_LOGGED_OUT_TEXT
      } else if (loggedIn) {
        derivedState.loggedInStatusMessage = `${LOGGED_IN_TEXT_PRE}"${name}"`
        derivedState.loggedIn = loggedIn
      }

      return derivedState
    }

    onButtonClick () {
      const { clickCount } = this.state
      const newCount = clickCount + 1
      this.setState({ clickCount: newCount })
    }

    render () {
      const { loggedIn, logIn, logOut } = this.props
      const { clickCount, loggedInStatusMessage } = this.state
      return (
        <ComponentToWrap
          onButtonClick={this.onButtonClick}
          loggedInStatusMessage={loggedInStatusMessage}
          showLogOutButton={loggedIn}
          showLogInButton={!loggedIn}
          onLogInClick={logIn}
          onLogOutClick={logOut}
          numHearts={clickCount}
        />
      )
    }
  }

  ExampleContainer.propTypes = {
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    name: PropTypes.string // eslint-disable-line react/no-unused-prop-types
  }

  return ExampleContainer
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
  name: state.auth.name
})

const mapDispatchToProps = (dispatch) => ({
  logOut: () => {
    return dispatch(logOut())
  },
  logIn: () => {
    return dispatch(logIn(FAKE_TOKEN))
  }
})

const withStateAndHandlers = (ComponentToWrap) => connect(
  mapStateToProps,
  mapDispatchToProps
)(withHandlers(ComponentToWrap))

export { withHandlers }
export default withStateAndHandlers
