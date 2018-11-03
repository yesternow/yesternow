import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, toggleCart } from '../store';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  MenuItem,
  Icon,
} from 'semantic-ui-react';
import Search from './search';

const Navbar = ({ handleClick, isLoggedIn, isAdmin, toggleCart }) => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as="a" header>
        <Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} />
        YESTERNOW
      </Menu.Item>
      <Menu.Item as="a">Home</Menu.Item>

      <Dropdown item simple text="Categories">
        <Dropdown.Menu>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>

    <Search />

    {isLoggedIn ? (
      <Menu.Menu>
        {isAdmin ? (
          <Menu.Item>Dashboard</Menu.Item>
        ) : (
          <Menu.Item>Account</Menu.Item>
        )}

        <Menu.Item>
          <Button negative onClick={handleClick}>
            Logout
          </Button>{' '}
        </Menu.Item>
      </Menu.Menu>
    ) : (
      <Menu.Menu>
        <Menu.Item as={Link} to="/login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/signup">
          Sign Up
        </Menu.Item>
      </Menu.Menu>
    )}
    <MenuItem>
      <Icon name="cart" onClick={toggleCart} />
    </MenuItem>
  </Menu>
  // import {Link} from 'react-router-dom'
  // import {logout} from '../store'
  // import {Menu, Image, Icon} from 'semantic-ui-react'

  // const Navbar = ({handleClick, isLoggedIn}) => (
  //   <Menu>
  //     <Menu.Item as={Link} to='/' name="yesternow">
  //       <Image size="mini" src="logo.png"/>
  //     </Menu.Item>
  //     <Menu.Item as={Link} to='/'>yesternow</Menu.Item>
  //     <Menu.Item as={Link} to='/products' name="Products" />
  //     <Menu.Item as={Link} to='/categories' name="Categories"/>
  //   {isLoggedIn ? (
  //     <Menu.Menu position="right">
  //       <Menu.Item as={Link} to='/orders' name="Orders">Orders</Menu.Item>
  //       <Menu.Item onClick={handleClick} position="right" name="Log Out"/>
  //       <Menu.Item as={Link} to="/cart" name="Cart">
  //         <Icon name="shopping cart"/>
  //       </Menu.Item>
  //     </Menu.Menu>)
  //   : (
  //     <Menu.Menu position="right">
  //       <Menu.Item as={Link} to="/login" name="Login"/>
  //       <Menu.Item as={Link} to="/signup" name="Sign Up"/>
  //       <Menu.Item as={Link} to="/cart" name="Cart">
  //         <Icon name="shopping cart"/>
  //       </Menu.Item>
  //     </Menu.Menu>
  //   )}
  //   </Menu>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    toggleCart() {
      dispatch(toggleCart());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
