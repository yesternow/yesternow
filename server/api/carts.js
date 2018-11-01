const router = require("express").Router();
const { Cart, CartItem, User } = require("../db/models");
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util')

router.get('/', requireLogin, requireAdmin, async (req, res, next) => {
    try{
        const carts = await Cart.findAll({include: [CartItem, User]})
        res.json(carts)
    } catch (err) {
        next (err)
    }
})



module.exports = router;
