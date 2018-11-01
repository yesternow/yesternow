const router = require('express').Router();
const { Order } = require('../db/models');
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util');

//Get all orders by a single user /admin

router.get(
  '/:id/orders',
  requireLogin,
  requireUserOrAdmin,
  (req, res, next) => {
    const userId = req.params.id;
    return Order.findAll({ where: { userId } })
      .then(orders => res.json(orders))
      .catch(next);
  }
);

//Get a a single order by  user

router.get('/:id/orders/:orderId', requireLogin, async (req, res, next) => {
  // if logged in, check that this is the logged in user's order
  // if admin show anything
  const order = await Order.findById(req.params.id);
  if (req.user.isAdmin) {
    res.json(order);
  } else if (order.userId === req.user.id) {
    res.json(order);
  } else {
    res.sendStatus(403);
  }
});

//Create order for a user

router.post('/:id/orders', requireUserOrAdmin, (req, res, next) => {
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

module.exports = router;
