import React from 'react';
import {connect} from 'react-redux';

export class SingleStudent extends React.Component {
	componentDidMount() {
		this.props.loadStudent(this.props.match.params.id);
	}

	render() {
		if (this.props.user) {
			const user = this.props.user;
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

const mapStateToProps = (state) => ({user: state.defaultUser});

const mapDispatchToProps = (dispatch) => ({
	loadStudent: (userId) => dispatch(getUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
