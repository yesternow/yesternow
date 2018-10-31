const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

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
    const user = await User.create(req.body, {
      where: {
        isAdmin: true,
      },
    });
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
    const updatedUser = await user.update(req.body, {
      where: {
        isAdmin: true,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});
