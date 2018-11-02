import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter } from 'react-router-dom'
import {logout, toggleCart} from '../store'
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
  Icon
} from 'semantic-ui-react'
import Search from './search'

const Navbar = ({handleClick, isLoggedIn, isAdmin, toggleCart}) => (
  <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
          YESTERNOW
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='Categories'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </Container>

      <Search  />

      {isLoggedIn
      ?

      <Menu.Menu>
        {isAdmin ? <Menu.Item>Dashboard</Menu.Item> : <Menu.Item>Account</Menu.Item>}

        <Menu.Item >
        <Button negative onClick={handleClick}>Logout</Button> </Menu.Item>
      </Menu.Menu>

      :

      <Menu.Menu>
        <Menu.Item as={Link} to='/login'>Login</Menu.Item>
        <Menu.Item as={Link} to='/signup'>Sign Up</Menu.Item>
      </Menu.Menu>

      }
      <MenuItem>
        <Icon name='cart' onClick={toggleCart} />
      </MenuItem>

    </Menu>
)


// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>YESTERNOW</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    toggleCart() {
      dispatch(toggleCart())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
