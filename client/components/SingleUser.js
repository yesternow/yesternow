import React from 'react';
import {connect} from 'react-redux';
import {grabUser} from '../store';
import {
	Container,
	Dropdown,
	Input,
	Card,
	Divider,
	Image,
	Grid,
	Button,
	Icon,
	Select,
	List,
	Rail,
	Sticky,
	Header,
	Segment,
	Form,
	Field,
	Checkbox
} from 'semantic-ui-react';

export class SingleUser extends React.Component {
	componentDidMount() {
		this.props.loadUser(this.props.match.params.id);
	}

	render() {
		if (this.props.users) {
			const user = this.props.users;
			return (
				<Card
					header="Elliot Baker"
					meta="Friend"
					description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
				/>
				// <div>
				// 	<div key={user.id}>
				// 		<img src={user.imageUrl} />
				// 		<ul>
				// 			<li>
				// 				Name:
				// 				{user.firstName} {user.lastName}
				// 			</li>
				// 			<li>Email: {user.email}</li>
				// 		</ul>
				// 	</div>
				// </div>
			);
		} else {
			return (
				<Card
					header="Elliot Baker"
					meta="Friend"
					description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
				/>
			);
		}
	}
}

const mapStateToProps = (state) => ({user: state.users});

const mapDispatchToProps = (dispatch) => ({
	loadUser: (userId) => dispatch(grabUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
