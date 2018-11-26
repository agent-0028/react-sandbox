import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logIn, logOut } from './actions/auth'
import { LOGGED_OUT_TEXT, JUST_LOGGED_OUT_TEXT, LOGGED_IN_TEXT_PRE } from './constants'

const withHandlers = (ComponentToWrap) => {
  class ExampleContainer extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        clickCount: 0,
        loggedInStatusMessage: LOGGED_OUT_TEXT
      }

      this.onButtonClick = this.onButtonClick.bind(this)
    }

    componentDidMount () {
      const { loggedIn, token } = this.props

      if (loggedIn) {
        this.setState({
          loggedInStatusMessage: `${LOGGED_IN_TEXT_PRE}"${token}"`
        })
      }
    }

    componentWillReceiveProps (nextProps) {
      const { loggedIn } = this.props
      const justLoggedOut = (loggedIn && !nextProps.loggedIn)

      if (justLoggedOut) {
        this.setState({
          loggedInStatusMessage: JUST_LOGGED_OUT_TEXT
        })
      } else if (nextProps.loggedIn) {
        this.setState({
          loggedInStatusMessage: `${LOGGED_IN_TEXT_PRE}"${nextProps.token}"`
        })
      }
    }

    onButtonClick () {
      const { clickCount } = this.state
      const newCount = clickCount + 1
      this.setState({ clickCount: newCount })
    }

    render () {
      const { loggedIn, logIn, logOut } = this.props
      const { clickCount } = this.state
      return (
        <ComponentToWrap
          onButtonClick={this.onButtonClick}
          loggedInStatusMessage={this.state.loggedInStatusMessage}
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
    token: PropTypes.string
  }

  return ExampleContainer
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      return dispatch(logOut())
    },
    logIn: () => {
      return dispatch(logIn())
    }
  }
}

const withStateAndHandlers = (ComponentToWrap) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withHandlers(ComponentToWrap))
}

export { withHandlers }
export default withStateAndHandlers
