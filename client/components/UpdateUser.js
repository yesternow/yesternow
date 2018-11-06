import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendUpdateUser, grabUser} from '../store';
import {Button, Form, Container} from 'semantic-ui-react';
import history from '../history';

class UpdateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			title: '',
			description: '',
			price: '',
			quantity: '',
			weight: '',
			brand: '',
			imageUrl: '',
			dimensions: '',
			isActive: false,
			categories: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	componentDidMount() {
		console.log(this.props.user);
		// this.props.loadUser(this.props.user.id);
		const {id, firstName, lastName, email, phone, imageUrl} = this.props.user;
		this.setState({
			id,
			firstName,
			lastName,
			email,
			phone,
			imageUrl
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.user.id !== this.props.user.id) {
			const {id, firstName, lastName, email, phone, imageUrl} = this.props.user;
			this.setState({
				id,
				firstName,
				lastName,
				email,
				phone,
				imageUrl
			});
		}
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	handleToggle() {
		this.setState({
			isActive: !this.state.isActive
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.sendUserUpdate(this.state);
		history.push(`/users/${this.state.id}`);
	}

	render() {
		console.log(this.state.email);
		const {firstName, lastName, email, phone, imageUrl} = this.state;
		return (
			<Container>
				<h3>Update User</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field required>
						<label>User Firstname</label>
						<input name="firstname" type="text" value={firstName} onChange={this.handleChange} />
					</Form.Field>
					<Form.Field required>
						<label>User Lastname</label>
						<input name="lastname" type="text" value={lastName} onChange={this.handleChange} />
					</Form.Field>
					<Form.Group widths="equal">
						<Form.Field required>
							<label>User Email</label>
							<input name="email" type="text" value={email} onChange={this.handleChange} />
						</Form.Field>
						<Form.Field required>
							<label>User Phone</label>
							<input name="phone" type="text" value={phone} onChange={this.handleChange} />
						</Form.Field>
						<Form.Field required>
							<label>User Profile Image</label>
							<input id="imageUrl" type="text" value={imageUrl} onChange={this.handleChange} />
						</Form.Field>
					</Form.Group>

					<Button type="submit">Submit</Button>
				</Form>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.users.user
});

const mapDispatchToProps = (dispatch) => ({
	sendUserUpdate: (user) => dispatch(sendUpdateUser(user)),
	loadUser: (userId) => dispatch(grabUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
