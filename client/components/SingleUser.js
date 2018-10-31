import React from 'react';
import {connect} from 'react-redux';
import {getUser} from './store';

export class SingleStudent extends React.Component {
	componentDidMount() {
		this.props.loadUser(this.props.match.params.id);
	}

	render() {
		if (this.props.users) {
			const user = this.props.users;
			return (
				<div>
					<div key={user.id}>
						<img className="studentImg" src={user.imageUrl} />
						<ul>
							<li>
								Name:
								{user.firstName} {user.lastName}
							</li>
							<li>Email: {user.email}</li>
						</ul>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<h1>User Not Found</h1>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({user: state.users});

const mapDispatchToProps = (dispatch) => ({
	loadUser: (userId) => dispatch(getUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
