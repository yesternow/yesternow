const router = require('express').Router();

const { Order, LineItem, Product, Image, User, CartItem } = require('../db/models');
const { requireAdmin, requireLogin } = require('./util');
const underscore = require('underscore')


//Get all orders

router.get('/', requireLogin, requireAdmin, async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [
				{model: User},
				{
					model: LineItem,
					include: [ {model: Product} ]
				}
			]
		});
		res.json(orders);
	} catch (error) {
		next(error);
	}
});

//Get single order


router.get('/:id', requireLogin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: LineItem,
          include: [
            {
              model: Product,
              include: [{ model: Image }],
            },
          ],
        },
      ],
    });
    if (req.user.isAdmin) {
      res.json(order);
    } else if (order.userId === req.user.id) {
      res.json(order);
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

// We will write these two routes when we finish cart and finish order functionality. When we create order we should create lineItems as well.

router.post('/', async (req, res, next) => {
  try {
    const {lineItems} = req.body
    const order = await Order.create(underscore.pick(req.body, ['guestId', 'guestEmail', 'guestNumber', 'addressId', 'userId']))
    await CartItem.destroy({where: {cartId: req.body.cartId}})
    lineItems.forEach(async lineItem=> await LineItem.create({...lineItem, orderId: order.id}))
    res.json(order)
    } catch (err) {
    next(err)
  }
})

router.put('/:id', requireLogin, requireAdmin, async (req, res, next) => {
	try {
		const {id, status} = req.body;
		const order = await Order.findById(id);
		await order.update({status});
		res.status(204).end();
	} catch (error) {
		next(error);
	}
});

module.exports = router;
