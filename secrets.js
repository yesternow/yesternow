const express = require('express');

process.env.GOOGLE_CLIENT_ID = '671168662555-griinkphne8j0hbf3jlukq3oi3ctjbkr.apps.googleusercontent.com';
process.env.GOOGLE_CLIENT_SECRET = '612mv26l8b1CjMGo5sBTiqxB';
process.env.GOOGLE_CALLBACK = '/auth/google/callback';

const googleConfigSecret = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.GOOGLE_CALLBACK
};

process.env.FACEBOOK_CLIENT_ID = '635400026856960';
process.env.FACEBOOK_CLIENT_SECRET = 'e84a6fa40fbaf9cae6cf18cf2a656186';
process.env.FACEBOOK_CALLBACK = '/auth/facebook/callback';

const facebookConfigSecret = {
	clientID: process.env.FACEBOOK_CLIENT_ID,
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
	callbackURL: process.env.FACEBOOK_CALLBACK
};

module.exports = {googleConfigSecret, facebookConfigSecret};
