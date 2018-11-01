const router = require("express").Router();
const { Cart, CartItem, User } = require("../db/models");
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util')

router.get('/', requireLogin, async (req, res, next) => {
    const userId = req.user.id
    try{
        const cart = await Cart.find({where: {userId}, include: [CartItem, User]})
        res.json(cart)
    } catch (err) {
        next (err)
    }
})



module.exports = router;
