const passport = require('passport');
const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const {User} = require('../db/models');
const {facebookConfigSecret} = require('../../secrets');
module.exports = router;

if (!process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {
	console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.');
} else {
	const facebookConfig = facebookConfigSecret;

	const strategy = new FacebookStrategy(facebookConfig, (token, refreshToken, profile, cb) => {
		const facebookId = profile.id;
		const name = profile.displayName;
		const email = profile.emails[0].value;

		User.findOrCreate({
			where: {facebookId},
			defaults: {name, email}
		})
			.then(([ user ]) => cb(null, user))
			.catch(cb);
	});

	passport.use(strategy);

	router.get('/', passport.authenticate('facebook', {scope: 'email'}));

	router.get(
		'/callback',
		passport.authenticate('facebook', {
			successRedirect: '/home',
			failureRedirect: '/login'
		})
	);
}
