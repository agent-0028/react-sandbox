import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import { BUTTON_TEXT, LOG_IN_BUTTON_TEXT, LOG_OUT_BUTTON_TEXT } from '../constants'

describe('Example', () => {
  let Subject, defaultProps, testProps, wrapper

  beforeEach(() => {
    defaultProps = {
      onButtonClick: () => {},
      loggedInStatusMessage: 'loggedInStatusMessage',
      showLogInButton: false,
      showLogOutButton: false,
      onLogInClick: () => {},
      onLogOutClick: () => {},
      numHearts: 0
    }

    Subject = require('../example').Example
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Subject {...defaultProps} />, div)
  })

  it('renders a button with text', () => {
    wrapper = shallow(
      <Subject {...defaultProps} />
    )
    const found = wrapper.find('button').findWhere((n) => n.text() === BUTTON_TEXT)

    expect(found.exists()).toEqual(true)
  })

  it('renders a button with a click handler', () => {
    testProps = { ...defaultProps }
    testProps.onButtonClick = jest.fn()
    wrapper = shallow(
      <Subject {...testProps} />
    )
    const found = wrapper.find({ onClick: testProps.onButtonClick })
    const handler = found.prop('onClick')

    handler()

    expect(testProps.onButtonClick).toHaveBeenCalledTimes(1)
  })

  it('renders the logged in status message', () => {
    wrapper = shallow(
      <Subject {...defaultProps} />
    )
    const found = wrapper.find('div.logged-in-status-message')

    expect(found.text()).toEqual(defaultProps.loggedInStatusMessage)
  })

  it('does not render the log in button', () => {
    wrapper = shallow(
      <Subject {...defaultProps} />
    )
    const found = wrapper.find({ onClick: testProps.onLogInClick })

    expect(found.exists()).toEqual(false)
  })

  it('does not render the log out button', () => {
    wrapper = shallow(
      <Subject {...defaultProps} />
    )
    const found = wrapper.find('button').findWhere((n) => n.text() === LOG_OUT_BUTTON_TEXT)

    expect(found.exists()).toEqual(false)
  })

  it('does not render any hearts', () => {
    wrapper = shallow(
      <Subject {...defaultProps} />
    )
    const found = wrapper.find('.hearts')

    expect(found.children().exists()).toEqual(false)
  })

  context('when numHearts is three', () => {
    it('renders three hearts', () => {
      testProps = { ...defaultProps }
      testProps.numHearts = 3
      wrapper = shallow(
        <Subject {...testProps} />
      )
      const found = wrapper.find('.green-heart')

      expect(found.length).toEqual(3)
    })
  })

  context('when showLogInButton is true', () => {
    beforeEach(() => {
      testProps = { ...defaultProps }
      testProps.showLogInButton = true
      testProps.onLogInClick = jest.fn()
    })

    it('renders a button that handles log in', () => {
      wrapper = shallow(
        <Subject {...testProps} />
      )
      const found = wrapper.find({ onClick: testProps.onLogInClick })
      const handler = found.prop('onClick')

      handler()

      expect(found.text()).toEqual(LOG_IN_BUTTON_TEXT)
      expect(testProps.onLogInClick).toHaveBeenCalledTimes(1)
    })
  })

  context('when showLogOutButton is true', () => {
    beforeEach(() => {
      testProps = { ...defaultProps }
      testProps.showLogOutButton = true
      testProps.onLogOutClick = jest.fn()
    })

    it('renders a button that handles log out', () => {
      wrapper = shallow(
        <Subject {...testProps} />
      )
      const found = wrapper.find({ onClick: testProps.onLogOutClick })
      const handler = found.prop('onClick')

      handler()

      expect(testProps.onLogOutClick).toHaveBeenCalledTimes(1)
    })
  })
})
