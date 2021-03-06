import React from 'react';
import {connect} from 'react-redux';
import {grabUser} from '../store';
import {UpdateUser} from './index';
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
		if (this.props.user.email) {
			const user = this.props.user;
			return (
				<List>
					<Card centered color="yellow">
						<Image src={user.imageUrl} />
						<Card.Content>
							<Card.Header>
								{user.firstName} {user.lastName}
							</Card.Header>
							<Card.Meta>
								<span className="date">Joined in {user.createdAt.substring(0, 4)}</span>
							</Card.Meta>

							<Card.Description>email: {user.email}</Card.Description>
							<Card.Description>mobile: {user.phone || 'unlisted'}</Card.Description>
							<Card.Description>User ID: {user.id}</Card.Description>
						</Card.Content>
					</Card>
					<UpdateUser user={user} />
				</List>
			);
		} else {
			return <h1>User not Found</h1>;
		}
	}
}

const mapStateToProps = (state) => ({user: state.users.user});

const mapDispatchToProps = (dispatch) => ({
	loadUser: (userId) => dispatch(grabUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
