const router = require('express').Router();
const {Order, LineItem, Product, Image} = require('../db/models');
const {requireAdmin, requireLogin, requireUserOrAdmin} = require('./util');

//Get single order

router.get('/', requireLogin, requireUserOrAdmin, async (req, res, next) => {
	try {
		const orders = await Order.findAll();
		res.json(orders);
	} catch (error) {
		next(error);
	}
});

//Get single order

router.get('/:id', requireLogin, requireUserOrAdmin, async (req, res, next) => {
	try {
		const id = req.params.id;
		const orders = await Order.findOne({
			where: {id},
			include: [
				{
					model: LineItem,
					include: [
						{
							model: Product,
							include: [ {model: Image} ]
						}
					]
				}
			]
		});
		if (req.user.isAdmin) {
			res.json(orders);
		} else if (userId === req.user.id) {
			res.json(orders);
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		next(error);
	}
});

//Get orders of a single user

router.get('/user/:userId/', requireLogin, async (req, res, next) => {
	// if logged in, check that this is the logged in user's order
	// if admin show anything
	const userId = req.params.userId;
	const orders = await Order.findAll({
		where: {userId},
		include: [
			{
				model: LineItem,
				include: [
					{
						model: Product,
						include: [ {model: Image} ]
					}
				]
			}
		]
	});
	if (req.user.isAdmin) {
		res.json(orders);
	} else if (userId === req.user.id) {
		res.json(orders);
	} else {
		res.sendStatus(403);
	}
});

//Create order for a user

/*

We will write these two routes when we finish cart and finish order functionality. When we create order we should create lineItems as well.


router.post('/user/:id/', requireUserOrAdmin, (req, res, next) => {
  let neworder = req.body;
  neworder['userId'] = req.params.id;
  return Order.create(neworder)
    .then(order => res.json(order))
    .catch(next);
});

router.put('/:id/orders/:orderid', requireUserOrAdmin, (req, res, next) => {
  return Order.findById(req.params.orderid)
    .then(order => {
      if (!order) return res.sendStatus(404);
      else {
        order.update(req.body).then(updatedOrder => {
          res.json(updatedOrder);
        });
      }
    })
    .catch(next);
});

*/

module.exports = router;
