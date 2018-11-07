const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {User, Cart, CartItem} = require('../db/models');
const {googleConfigSecret} = require('../../secrets');
module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	console.log('Google client ID / secret not found. Skipping Google OAuth.');
} else {
	const googleConfig = googleConfigSecret;

	const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
		const googleId = profile.id;
		const firstName = profile.name.givenName;
		const imageUrl = profile.photos ? profile.photos[0].value : null
		const lastName = profile.name.familyName;
		const email = profile.emails[0].value;

		User.findOrCreate({
			where: {googleId},
			defaults: {firstName, lastName, email, googleId, imageUrl}
		})
			.then(async ([ user ]) => {
				done(null, user)
				const userId = user.id
           			 await Cart.findOrCreate({where: {userId}, defaults:{userId}})

			})
			.catch(done);
	});

	passport.use(strategy);

	router.get('/', passport.authenticate('google', {scope: 'email'}));

	router.get(
		'/callback',
		passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/login'
		})
	);
}
