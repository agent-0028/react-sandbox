import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'

import { LOGGED_OUT_TEXT, JUST_LOGGED_OUT_TEXT, LOGGED_IN_TEXT_PRE } from '../constants'

describe('withHandlers', () => {
  let subject, defaultProps, testProps, SomePresentationalComponent, ContainerComponent, dumbComponentProps, wrapper

  beforeEach(() => {
    defaultProps = {
      logIn: () => {},
      logOut: () => {},
      loggedIn: false
    }

    subject = require('../exampleContainer').withHandlers
    SomePresentationalComponent = (props) => (<div>Presentational Component</div>)

    ContainerComponent = subject(SomePresentationalComponent)
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

      it('sets logged in to false', () => {
        expect(wrapper.state('loggedIn')).toEqual(false)
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
        testProps = { ...defaultProps, logOut: td.func() }

        wrapper = mount(
          <ContainerComponent {...testProps} />
        )

        dumbComponentProps = wrapper.find('SomePresentationalComponent').props()
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

        td.verify(testProps.logOut(), { times: 1 })
      })

      it('tells the wrapped component how many hearts to render', () => {
        expect(dumbComponentProps.numHearts).toEqual(0)
      })

      context('when there are five clicks', () => {
        beforeEach(() => {
          testProps = { ...defaultProps }

          wrapper = mount(
            <ContainerComponent {...testProps} />
          )
          wrapper.setState({ clickCount: 5 })
        })

        it('tells the wrapped component to render five hearts', () => {
          const found = wrapper.find('SomePresentationalComponent')
          expect(found.prop('numHearts')).toEqual(5)
        })
      })
    })

    context('when logged in', () => {
      describe('wrapped component props', () => {
        beforeEach(() => {
          testProps = {
            ...defaultProps,
            loggedIn: true,
            name: 'Jane Doe'
          }

          wrapper = mount(
            <ContainerComponent {...testProps} />
          )

          dumbComponentProps = wrapper.find('SomePresentationalComponent').props()
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
        testProps = { ...defaultProps, loggedIn: true }

        wrapper = mount(
          <ContainerComponent {...testProps} />
        )

        wrapper.setProps({ loggedIn: false })

        expect(wrapper.state('loggedInStatusMessage')).toEqual(JUST_LOGGED_OUT_TEXT)
      })
    })

    context('when props change from logged out to logged in', () => {
      it("provides a logged in status message with the user's name", () => {
        testProps = { ...defaultProps, loggedIn: false }

        wrapper = mount(
          <ContainerComponent {...testProps} />
        )

        wrapper.setProps({ loggedIn: true, name: 'John Doe' })

        expect(wrapper.state('loggedInStatusMessage')).toEqual(`${LOGGED_IN_TEXT_PRE}"John Doe"`)
      })
    })
  })
})
