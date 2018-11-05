const router = require('express').Router();
const { User, Order, LineItem, Product, Image } = require('../db/models');
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util');
const underscore = require('underscore');

const userFieldAllowList = [
  'firstName',
  'lastName',
  'email',
  'password',
  'imageUrl',
  'phone',
];
const userFieldAdminAllowList = [...userFieldAllowList, 'isAdmin'];

//get all users

router.get('/', (req, res, next) => {
  return User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

//get user by id

router.get('/:id', requireLogin, requireUserOrAdmin, (req, res, next) => {
  return User.findById(req.params.id)
    .then(
      user =>
        user
          ? res.json({
              id: user.id,
              isAdmin: user.isAdmin,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              imageUrl: user.imageUrl,
              phone: user.phone,
              createdAt: user.createdAt,
            })
          : res.sendStatus(404)
    )
    .catch(next);
});
router.get(
  '/:id/orders',
  requireLogin,
  requireUserOrAdmin,
  (req, res, next) => {
    return Order.findAll({
      where: { userId: req.params.id },
      include: [
        { model: User },
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
    })
      .then(order => (order ? res.json(order) : res.sendStatus(404)))
      .catch(next);
  }
);

//create user

router.post('/', (req, res, next) => {
  return User.create(underscore.pick(req.body, userFieldAllowList))
    .then(user => res.json(user))
    .catch(next);
});

//update user

router.put('/:id', requireLogin, requireUserOrAdmin, async (req, res, next) => {
  const userUpdates = req.user.isAdmin
    ? underscore.pick(req.body, userFieldAdminAllowList)
    : underscore.pick(req.body, userFieldAllowList);
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);
    await user.update(userUpdates);
    res.status(204).json({
      id: user.id,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
      phone: user.phone,
    });
  } catch (err) {
    next(err);
  }
});

//delete user

router.delete('/:id', requireLogin, requireUserOrAdmin, (req, res, next) => {
  return User.findById(req.params.id)
    .then(user => {
      if (user) {
        return User.destroy({ where: { id: req.params.id } }).then(() =>
          res.sendStatus(202)
        );
      } else res.sendStatus(404);
    })
    .catch(next);
});

module.exports = router;
