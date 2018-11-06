import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
	onToken(token) {
		fetch('/api/stripe', {
			method: 'POST',
			body: JSON.stringify({stripeToken: token.id})
		}).then((response) => {
			console.log(response);
			response.json().then((data) => {
				alert(`We are in business, ${data.email}`);
			});
		});
	}

	render() {
		return <StripeCheckout name="YESTERNOW" token={this.onToken} stripeKey="pk_test_yvVC1NkMLli3EGIwWF0aR1BD" />;
	}
}

//publishable key pk_test_yvVC1NkMLli3EGIwWF0aR1BD
//secret key sk_test_4uPct9rBJ9kVDIJb1hrT060R
