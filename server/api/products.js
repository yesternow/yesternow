const router = require('express').Router();
const { Product, Category, Image, Review } = require('../db/models');
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util');
const underscore = require('underscore')

const productFieldsAllowList = ['title', 'description', 'price', 'quantity', 'weight', 'brand'];

router.get('/', async (req, res, next) => {
  try {
    //updated findAll to include category data to filter products at all products page
    const products = await Product.findAll({
      include: [{ model: Category, through: { attributes: [] } }, Image],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId, { include: [Category, Review, Image] })
    .then(response => res.json(response))
    .catch(next);
});

router.put('/:productId', requireLogin, requireAdmin, (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      product.update(underscore.pick(req.body, productFieldsAllowList));
    })
    .then(() => res.status(204).end())
    .catch(next);
});

router.post('/', requireLogin, (req, res, next) => {
  Product.create(underscore.pick(req.body, productFieldsAllowList))
    .then(response => res.json(response))
    .catch(next);
});

router.delete('/:productId', requireLogin, requireAdmin, (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
