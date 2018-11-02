import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Image, Icon} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Menu>
    <Menu.Item as={Link} to='/' name="yesternow">
      <Image size="mini" src="logo.png"/>
    </Menu.Item>
    <Menu.Item as={Link} to='/'>yesternow</Menu.Item>
    <Menu.Item as={Link} to='/products' name="Products" />
    <Menu.Item as={Link} to='/categories' name="Categories"/>
  {isLoggedIn ? (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to='/orders' name="Orders">Orders</Menu.Item>
      <Menu.Item onClick={handleClick} position="right" name="Log Out"/>
      <Menu.Item as={Link} to="/cart" name="Cart">
        <Icon name="shopping cart"/>
      </Menu.Item>
    </Menu.Menu>)
  : (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to="/login" name="Login"/>
      <Menu.Item as={Link} to="/signup" name="Sign Up"/>
      <Menu.Item as={Link} to="/cart" name="Cart">
        <Icon name="shopping cart"/>
      </Menu.Item>
    </Menu.Menu>
  )}
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
