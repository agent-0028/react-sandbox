import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { LOGGED_OUT_TEXT, JUST_LOGGED_OUT_TEXT, LOGGED_IN_TEXT_PRE } from '../constants'

describe('withHandlers', () => {
  let subject, defaultProps, testProps, SomeDumbComponent, WrappedComponent, wrapper

  beforeEach(() => {
    window.alert = jest.fn()

    defaultProps = {
      logIn: () => {},
      logOut: () => {},
      loggedIn: false
    }

    subject = require('../exampleContainer').withHandlers
    SomeDumbComponent = function (props) {
      return (<div>Dumb Component</div>)
    }

    WrappedComponent = subject(SomeDumbComponent)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <WrappedComponent {...defaultProps} />,
      div
    )
  })

  context('when component first mounts', () => {
    let wrappedComponentProps

    describe('initial local state', () => {
      beforeEach(() => {
        wrapper = mount(
          <WrappedComponent {...defaultProps} />
        )
      })

      it('sets click count to zero', () => {
        expect(wrapper.state('clickCount')).toEqual(0)
      })

      it('sets logged in status message', () => {
        expect(wrapper.state('loggedInStatusMessage')).toEqual(LOGGED_OUT_TEXT)
      })
    })

    describe('wrapped component props', () => {
      beforeEach(() => {
        testProps = { ...defaultProps }
        testProps.logOut = jest.fn()

        wrapper = mount(
          <WrappedComponent {...testProps} />
        )

        wrappedComponentProps = wrapper.find('SomeDumbComponent').props()
      })

      it('provides a click handler for this silly button', () => {
        wrappedComponentProps.onButtonClick()

        expect(wrapper.state('clickCount')).toEqual(1)
      })

      it('provides a logged in status message from local state', () => {
        expect(wrappedComponentProps.loggedInStatusMessage).toEqual(wrapper.state('loggedInStatusMessage'))
      })

      it('tells the wrapped component not to show the log out button', () => {
        expect(wrappedComponentProps.showLogOutButton).toEqual(false)
      })

      it('provides a log out click handler from props', () => {
        wrappedComponentProps.onLogOutClick()

        expect(testProps.logOut).toHaveBeenCalledTimes(1)
      })
    })

    context('when logged in', () => {
      describe('wrapped component props', () => {
        beforeEach(() => {
          testProps = { ...defaultProps }
          testProps.loggedIn = true
          testProps.token = 'some-token'

          wrapper = mount(
            <WrappedComponent {...testProps} />
          )

          wrappedComponentProps = wrapper.find('SomeDumbComponent').props()
        })

        it('provides a logged in status message with token', () => {
          expect(wrappedComponentProps.loggedInStatusMessage).toEqual(`${LOGGED_IN_TEXT_PRE}"some-token"`)
        })

        it('tells the wrapped component to show the log out button', () => {
          expect(wrappedComponentProps.showLogOutButton).toEqual(true)
        })
      })
    })
  })

  context('when props change after mount', () => {
    context('when props change from logged in to not logged in', () => {
      it('changes the logged in status message to tell user they just logged out', () => {
        testProps = { ...defaultProps }
        testProps.loggedIn = true

        wrapper = mount(
          <WrappedComponent {...testProps} />
        )

        wrapper.setProps({ loggedIn: false })

        expect(wrapper.state('loggedInStatusMessage')).toEqual(JUST_LOGGED_OUT_TEXT)
      })
    })

    context('when props change from logged out to logged in', () => {
      it('provides a logged in status message with token', () => {
        testProps = { ...defaultProps }
        testProps.loggedIn = false

        wrapper = mount(
          <WrappedComponent {...testProps} />
        )

        wrapper.setProps({ loggedIn: true, token: 'some-other-token' })

        expect(wrapper.state('loggedInStatusMessage')).toEqual(`${LOGGED_IN_TEXT_PRE}"some-other-token"`)
      })
    })
  })
})
