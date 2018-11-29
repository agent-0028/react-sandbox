import jwtDecode from 'jwt-decode'

export default (value) => {
  return jwtDecode(value)
}
