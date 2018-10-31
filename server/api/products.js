const router = require("express").Router();
const { Product, Category } = require("../db/models");

router.get("/", async (req, res, next) => {
const productFieldsAllowList = ['title', 'description', 'price']


// limit/offset pagination
// GET /products
// GET /products?page=3&pagePage=10&categoryId=5

// cursor pagination
// GET /products?perPage=10&after=<timestamp>
// select * from products
// where createdAt > timestamp
// order by createdAt
// limit 10

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1
  const perPage = req.query.perPage || 10
  const categoryId = req.query.categoryId

  try {

    //updated findAll to include category data to filter products at all products page
    const categoryInclude = {
      model: Category,
      through: {attributes: []}
    }
    if (categoryId) {
      categoryInclude.reqired = true
      categoryInclude.where = { id: categoryId }
    }

    const productQuery = {
      include: [categoryInclude]
      orderBy: 'updatedAt ASC',
    }
    const products = await Product.findAll({
      ...productQuery,
      limit: page,
      offset: page * perPage,
    });
    const queryCount = await Product.count(productQuery)

    res.json({
      page: page,
      perPage: perPage,
      totalItems: queryCount,
      items: products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/categories', async (req, res, next) => {
  try{
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get("/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then(response => res.json(response))
    .catch(next);
});

<<<<<<< Updated upstream
router.put("/:productId", (req, res, next) => {
=======
// REVIEW:
//  * NO req.body
//  * requireLogin
//  * requireAdmin

// server/util.js
export function requireLogin (req, res, next) {
  if (req.user) {
    next()
  }
  else {
    res.send(401)
  }
}

export function requireAdmin (req, res, next) {
  if (req.user.isAdmin) {
    next()
  }
  else {
    res.send(403)
  }
}

const { requireLogin, requireAdmin } = require('../util')

router.put('/:productId', requireLogin, requireAdmin, (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      product.update(underscore.pick(req.body, productFieldsAllowList));
    })
    .then(() => res.status(204).end())
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(underscore.pick(req.body, productFieldsAllowList))
    .then(response => res.json(response))
    .catch(next);
});

router.delete("/:productId", (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
