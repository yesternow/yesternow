// server/api/stripe

const router = require('express').Router();
const {stripe} = require('../../secrets');

router.post('/', (req, res, next) => {
	const stripeToken = req.body.stripeToken;

	stripe.charges.create(
		{
			amount: 999,
			currency: 'usd',
			description: 'Example charge',
			source: stripeToken
		},
		function(err, charge) {
			console.log('charge: ', charge);
			if (err) {
				res.send({success: false, message: 'Error'});
			} else {
				res.send({success: true, message: 'Success'});
			}
		}
	);
});

module.exports = router;
