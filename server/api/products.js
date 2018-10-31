const router = require('express').Router();
const { Product } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(response => res.json(response))
    .catch(next);
});

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      product.update(req.body);
    })
    .then(() => res.status(204).end())
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(response => res.json(response))
    .catch(next);
});

router.delete('/:productId', (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
