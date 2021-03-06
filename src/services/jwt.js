import jwtDecode from 'jwt-decode'

const decode = (value) => jwtDecode(value)

export default decode
