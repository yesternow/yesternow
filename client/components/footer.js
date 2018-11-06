import React, { Component } from 'react';
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
} from 'semantic-ui-react';

export class Footer extends Component {
  render() {
    return (
      //         <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      //   <Container textAlign='center'>
      //     <Grid divided inverted stackable>
      //       <Grid.Row>
      //         <Grid.Column width={3}>
      //           <Header inverted as='h4' content='Group 1' />
      //           <List link inverted>
      //             <List.Item as='a'>Link One</List.Item>
      //             <List.Item as='a'>Link Two</List.Item>
      //             <List.Item as='a'>Link Three</List.Item>
      //             <List.Item as='a'>Link Four</List.Item>
      //           </List>
      //         </Grid.Column>
      //         <Grid.Column width={3}>
      //           <Header inverted as='h4' content='Group 2' />
      //           <List link inverted>
      //             <List.Item as='a'>Link One</List.Item>
      //             <List.Item as='a'>Link Two</List.Item>
      //             <List.Item as='a'>Link Three</List.Item>
      //             <List.Item as='a'>Link Four</List.Item>
      //           </List>
      //         </Grid.Column>
      //         <Grid.Column width={3}>
      //           <Header inverted as='h4' content='Group 3' />
      //           <List link inverted>
      //             <List.Item as='a'>Link One</List.Item>
      //             <List.Item as='a'>Link Two</List.Item>
      //             <List.Item as='a'>Link Three</List.Item>
      //             <List.Item as='a'>Link Four</List.Item>
      //           </List>
      //         </Grid.Column>
      //         <Grid.Column width={7}>
      //           <Header inverted as='h4' content='Footer Header' />
      //           <p>
      //             Extra space for a call to action inside the footer that could help re-engage users.
      //           </p>
      //         </Grid.Column>
      //       </Grid.Row>
      //     </Grid>

      //     <Divider inverted section />
      //     <Image centered size='mini' src='/logo.png' />
      //     <List horizontal inverted divided link>
      //       <List.Item as='a' href='#'>
      //         Site Map
      //       </List.Item>
      //       <List.Item as='a' href='#'>
      //         Contact Us
      //       </List.Item>
      //       <List.Item as='a' href='#'>
      //         Terms and Conditions
      //       </List.Item>
      //       <List.Item as='a' href='#'>
      //         Privacy Policy
      //       </List.Item>
      //     </List>
      //   </Container>
      // </Segment>

      <Menu
        inverted
        borderless
        fixed="bottom"
        style={{
          flexShrink: 0, //don't allow flexbox to shrink it
          borderRadius: 0, //clear semantic-ui style
          margin: 0, //clear semantic-ui style
        }}
      >
        <Menu.Item header />
      </Menu>
    );
  }
}

export default Footer;
