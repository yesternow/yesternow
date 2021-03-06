import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout, toggleCart } from "../store";
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
  Label
} from "semantic-ui-react";
import Search from "./search";

const Navbar = ({
  handleClick,
  isLoggedIn,
  isAdmin,
  toggleCart,
  userFirstName,
  userId,
  cart
}) => {
  let cartQuantity = 0;
  if (cart.cartItems) {
    cartQuantity = cart.cartItems
      .map(el => el.quantity)
      .reduce((a, b) => a + b, 0);
  }
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size="mini" src="/navbarLogo.jpg" style={{ marginRight: "1.5em" }} />
          YESTERNOW
        </Menu.Item>
      </Container>
      <Menu.Item>
        <Search />
      </Menu.Item>
      {isLoggedIn ? (
        <Menu.Menu>
          {isAdmin ? (
            <Dropdown item simple text="Dashboard">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/Users">
                  Users
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/Orders">
                  Orders
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/AllProductsAdmin">
                  Products
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/addproduct">
                  Add Product
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item>
              <List>
                <List.Item>Hello, {userFirstName}</List.Item>
                <Dropdown item simple text="Account">
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/users/${userId}/orders`}>
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/users/${userId}`}>
                      Profile
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </List>
            </Menu.Item>
          )}

          <Menu.Item>
            <Button negative onClick={handleClick}>
              Logout
            </Button>
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
      <Menu.Menu>
        <Menu.Item>
          <Icon size="large" name="cart" onClick={toggleCart} />
          {cartQuantity > 0 && (
            <Label color="red" circular attached="bottom right">
              {cartQuantity}
            </Label>
          )}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    userFirstName: state.user.firstName,
    userId: state.user.id,
    cart: state.carts.cart
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    toggleCart() {
      dispatch(toggleCart());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
