const router = require("express").Router();
const { Product, Category, Image, Review } = require("../db/models");


router.get("/", async (req, res, next) => {
  try {

    //updated findAll to include category data to filter products at all products page

    const products = await Product.findAll({
      include: [{ model: Category, through: {attributes: []} }, Image]
    });
    res.json(products);
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
  Product.findById(req.params.productId,{ include: [Category, Review, Image]})
    .then(response => res.json(response))
    .catch(next);
});

router.put("/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      product.update(req.body);
    })
    .then(() => res.status(204).end())
    .catch(next);
});

router.post("/", (req, res, next) => {
  Product.create(req.body)
    .then(response => res.json(response))
    .catch(next);
});

router.delete("/:productId", (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
