const router = require('express').Router();
module.exports = router;

const { requireLogin, requireAdmin } = require('./util')

router.use('/users', require('./users'));
router.use('/products', require('./products'));
//router.use('/warehouse', requireLogin, requireAdmin, require('./warehouse'))

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
