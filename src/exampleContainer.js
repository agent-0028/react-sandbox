import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logIn, logOut } from './actions/auth';

const withHandlers = (ComponentToWrap) => {
  class ExampleContainer extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        clickCount: 0,
        loggedInStatusMessage: 'You are not logged in.'
      };

      this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentDidMount () {
      const { loggedIn, token } = this.props;

      if (loggedIn) {
        this.setState({
          loggedInStatusMessage: `You are logged in, and your token is: "${token}"`
        });
      }
    }

    componentWillReceiveProps (nextProps) {
      const { loggedIn } = this.props;
      const justLoggedOut = (loggedIn && !nextProps.loggedIn);

      if (justLoggedOut) {
        this.setState({
          loggedInStatusMessage: 'You just logged out!'
        });
      } else if (nextProps.loggedIn) {
        this.setState({
          loggedInStatusMessage: `You are logged in, and your token is: "${nextProps.token}"`
        });
      }
    }

    onButtonClick () {
      const { clickCount } = this.state;
      const newCount = clickCount + 1;
      this.setState({ clickCount: newCount });
      window.alert(`Clicked: ${newCount}`);
    }

    render () {
      const { loggedIn, logIn, logOut } = this.props;
      return (
        <ComponentToWrap
          buttonText="Click to change local state on container!"
          onButtonClick={this.onButtonClick}
          loggedInStatusMessage={this.state.loggedInStatusMessage}
          showLogOutButton={loggedIn}
          showLogInButton={!loggedIn}
          onLogInClick={logIn}
          onLogOutClick={logOut}
        />
      );
    }
  }

  ExampleContainer.propTypes = {
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    token: PropTypes.string
  };

  return ExampleContainer;
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      return dispatch(logOut());
    },
    logIn: () => {
      return dispatch(logIn());
    }
  };
};

const withStateAndHandlers = (ComponentToWrap) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withHandlers(ComponentToWrap));
};

export { withHandlers };
export default withStateAndHandlers;
