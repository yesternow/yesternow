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
		console.log(profile, 'profile please please');
		const facebookId = profile.id;
		const firstName = profile.displayName;
		const lastName = profile.displayName;
		const email = profile.email || 'default@email.com';

		User.findOrCreate({
			where: {facebookId},
			defaults: {firstName, lastName, email}
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
