const router = require('express').Router();
const { User } = require('../db/models');
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util');

const userFieldAllowList = ['firstName', 'lastName', 'email'];
const userFieldAdminAllowList = [...userFieldAllowList, 'isAdmin'];

//get all users

router.get('/', requireAdmin, (req, res, next) => {
  return User.findAll({
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});

//get user by id

router.get('/:id', requireUserOrAdmin, (req, res, next) => {
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
            })
          : res.sendStatus(404)
    )
    .catch(next);
});

//create user

router.post('/', (req, res, next) => {
  return User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
});

//update user

router.put('/:id', async (req, res, next) => {
  const userUpdates = req.user.isAdmin
    ? underscore.pick(req.body, userFieldAdminAllowList)
    : underscore.pick(req.body, userFieldAllowList);
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);
    await user.update(req.body);
    await user.update(userUpdates);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

//delete user

router.delete('/:id', requireUserOrAdmin, (req, res, next) => {
  return User.findById(req.params.id)
    .then(user => {
      if (user) {
        return User.destroy({ where: { id: req.params.id } }).then(() =>
          res.sendStatus(200)
        );
      } else res.sendStatus(404);
    })
    .catch(next);
});

module.exports = router;
