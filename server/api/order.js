router.get('/:orderId', loginRequired, async (req, res, next) => {
  // if logged in, check that this is the logged in user's order
  // if admin show anything
  const order = await Order.findById(req.params.id)
  if (req.user.isAdmin) {
    res.json(order)
  }
  else if (order.userId === req.user.id) {
    res.json(order)
  }
  else {
    res.sendStatus(403)
  }
})
