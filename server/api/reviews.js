const router = require('express').Router();
const { Review } = require('../db/models');
const underscore = require('underscore');

const reviewFieldsAllowList = ['userId', 'productId', 'rating', 'description'];

router.post('/', async (req, res, next) => {
  try {
    const { description, rating, userId, productId } = req.body;
    const review = await Review.create({
      rating,
      description,
      userId,
      productId,
    });

    res.json(review);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
