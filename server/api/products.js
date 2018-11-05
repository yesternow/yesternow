const router = require('express').Router();
const db = require('../db');
const { Product, Category, Image, Review } = require('../db/models');
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util');
const underscore = require('underscore');
const Tag = db.models.tags;

const productFieldsAllowList = [
  'title',
  'description',
  'price',
  'quantity',
  'weight',
  'brand',
  'dimensions',
  'imageUrl',
  'isActive',
  'isFeatured',
  'isAvailable',
];

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

router.put(
  '/:productId',
  requireLogin,
  requireAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.productId);
      await product.update(underscore.pick(req.body, productFieldsAllowList));
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/', requireLogin, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(
      underscore.pick(req.body, productFieldsAllowList)
    );
    req.body.categories.split(',').forEach(async category => {
      const found = await Category.findOrCreate({
        where: { name: category },
        defaults: { name: category },
      });
      await product.addCategory(found[0]);
      //tried product.addCategories too but not get it to work
    });

    // await product.setImage(req.body.imageUrl)
    await Image.create({ productId: product.id, imageUrl: req.body.imageUrl });
    const newProduct = await Product.findById(product.id, {
      include: [Image, Category, Review],
    });
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', requireLogin, requireAdmin, (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
