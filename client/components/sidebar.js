import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Ref } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Cart } from './cart'
import { fetchCart } from '../store';

class SidebarCart extends Component {
    // componentDidMount(){
    //     this.props.loadCart()
    // }

  render() {
    const  visible  = this.props.showCart

    return (
      <div>
        <Sidebar.Pushable as={Segment} >
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            inverted
            vertical
            visible={visible}
            width='wide'
          >
          <Header>Cart Will be Here</Header>
          {/* <Cart /> */}

            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    showCart: state.carts.showCart,
    isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
    loadCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps)(SidebarCart)
