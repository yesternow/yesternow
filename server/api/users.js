const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = User.findById(req.params.userId, {
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//create user

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//update user

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.sendStatus(404);

    await user.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

//delete user

router.delete('/:userId', (req, res, next) => {
  User.destroy({ where: { id: req.params.userId } })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
