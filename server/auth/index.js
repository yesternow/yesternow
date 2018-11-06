const router = require('express').Router();
const { User, Cart, CartItem} = require('../db/models');
module.exports = router;

const userNotFound = (next) => {
	const err = new Error('Not found');
	err.status = 404;
	next(err);
};

router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({where: {email: req.body.email}});
		if (!user) {
			console.log('No such user found:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else if (!user.correctPassword(req.body.password)) {
			console.log('Incorrect password for user:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else {
			req.login(user, (err) => (err ? next(err) : res.json(user)));
		}
	} catch (err) {
		next(err);
	}
});

router.post('/signup', async (req, res, next) => {
	try {
		const { email, password } = req.body
		const user = await User.create({email, password});
		const userId = user.id
		const guestCart = await Cart.findOne({where: {guestId: req.session.id}})
		console.log('guestCart', guestCart)
		const cartItems = await CartItem.findAll({where: {cartId: guestCart.id}})
		console.log('cartItems')
		if(cartItems.length){
            await guestCart.setUser(userId)
            // res.json(guestCart)
        } else {
            await Cart.create({userId})
            await guestCart.destroy()
            // res.json(cart)
        }


		req.login(user, (err) => (err ? next(err) : res.json(user)));
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists');
		} else {
			next(err);
		}
	}
});

router.post('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/me', (req, res, next) => {
	res.json(req.user);
});

router.use('/google', require('./google'));
router.use('/facebook', require('./facebook'));
