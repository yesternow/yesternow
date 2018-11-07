import React, {Component} from 'react';
import {Grid, Container, List, Button} from 'semantic-ui-react';
import {grabUsers, sendRemoveUser, sendUpdateUser} from '../store';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Users extends Component {
	componentDidMount() {
		this.props.loadUsers();
	}
	render() {
		if (!this.props.users) {
			return <h3>No users</h3>;
		}

		return (
			<Container>
				<Grid>
					<Grid.Column>
						<List celled>
							<h3>All Users</h3>
							{this.props.users.map((user) => (
								<List.Item key={user.id}>
									<List.Content>
										<List.Header as={Link} to={`/users/${user.id}`}>
											{user.firstName} {user.lastName}
										</List.Header>
										<List.Description>{'is admin: ' + user.isAdmin}</List.Description>
									</List.Content>
									<List.Content floated="right">
										<Button
											onClick={() =>
												this.props.updateUser({
													id: user.id,
													isAdmin: !user.isAdmin
												})}
										>
											Toggle Admin Status
										</Button>
										<Button onClick={() => this.props.removeUser(user.id)}>Remove User</Button>
										<Button>Send Password Reset</Button>
									</List.Content>
								</List.Item>
							))}
						</List>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	users: state.users.users
});

const mapDispatchToProps = (dispatch) => ({
	loadUsers: () => dispatch(grabUsers()),
	removeUser: (userId) => dispatch(sendRemoveUser(userId)),
	updateUser: (user) => dispatch(sendUpdateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
