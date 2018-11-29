import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'

import { LOGGED_OUT_TEXT, JUST_LOGGED_OUT_TEXT, LOGGED_IN_TEXT_PRE } from '../constants'

describe('withHandlers', () => {
  let subject, defaultProps, testProps, SomeDumbComponent, ContainerComponent, dumbComponentProps, wrapper

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

    ContainerComponent = subject(SomeDumbComponent)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ContainerComponent {...defaultProps} />,
      div
    )
  })

  context('when component first mounts', () => {
    describe('initial local state', () => {
      beforeEach(() => {
        wrapper = mount(
          <ContainerComponent {...defaultProps} />
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
          <ContainerComponent {...testProps} />
        )

        dumbComponentProps = wrapper.find('SomeDumbComponent').props()
      })

      it('provides a click handler for this silly button', () => {
        dumbComponentProps.onButtonClick()

        expect(wrapper.state('clickCount')).toEqual(1)
      })

      it('provides a logged in status message from local state', () => {
        expect(dumbComponentProps.loggedInStatusMessage).toEqual(wrapper.state('loggedInStatusMessage'))
      })

      it('tells the wrapped component not to show the log out button', () => {
        expect(dumbComponentProps.showLogOutButton).toEqual(false)
      })

      it('provides a log out click handler from props', () => {
        dumbComponentProps.onLogOutClick()

        expect(testProps.logOut).toHaveBeenCalledTimes(1)
      })

      it('tells the wrapped component how many hearts to render', () => {
        expect(dumbComponentProps.numHearts).toEqual(0)
      })
    })

    context('when logged in', () => {
      describe('wrapped component props', () => {
        beforeEach(() => {
          testProps = { ...defaultProps }
          testProps.loggedIn = true
          testProps.name = 'Jane Doe'

          wrapper = mount(
            <ContainerComponent {...testProps} />
          )

          dumbComponentProps = wrapper.find('SomeDumbComponent').props()
        })

        it("provides a logged in status message with the user's name", () => {
          expect(dumbComponentProps.loggedInStatusMessage).toEqual(`${LOGGED_IN_TEXT_PRE}"Jane Doe"`)
        })

        it('tells the wrapped component to show the log out button', () => {
          expect(dumbComponentProps.showLogOutButton).toEqual(true)
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
          <ContainerComponent {...testProps} />
        )

        wrapper.setProps({ loggedIn: false })

        expect(wrapper.state('loggedInStatusMessage')).toEqual(JUST_LOGGED_OUT_TEXT)
      })
    })

    context('when props change from logged out to logged in', () => {
      it("provides a logged in status message with the user's name", () => {
        testProps = { ...defaultProps }
        testProps.loggedIn = false

        wrapper = mount(
          <ContainerComponent {...testProps} />
        )

        wrapper.setProps({ loggedIn: true, name: 'John Doe' })

        expect(wrapper.state('loggedInStatusMessage')).toEqual(`${LOGGED_IN_TEXT_PRE}"John Doe"`)
      })
    })
  })

  context('when there are three clicks', () => {
    describe('wrapped component props', () => {
      beforeEach(() => {
        testProps = { ...defaultProps }

        wrapper = mount(
          <ContainerComponent {...testProps} />
        )
        wrapper.setState({ clickCount: 3 })
      })

      it('tells the wrapped component to render three hearts', () => {
        const foo = wrapper.find('SomeDumbComponent')
        expect(foo.prop('numHearts')).toEqual(3)
      })
    })
  })
})
