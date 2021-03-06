import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

// map context to describe for more semantic-ness
global.context = global.describe

global.td = require('testdouble')
require('testdouble-jest')(td, jest)

afterEach(function () {
  td.reset()
})
