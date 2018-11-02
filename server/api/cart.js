const router = require("express").Router();
const { Cart, CartItem, User, Product, Image } = require("../db/models");
const { requireAdmin, requireLogin, requireUserOrAdmin } = require('./util')

router.get('/', requireLogin, async (req, res, next) => {
    const userId = req.user.id
    try{
        const cart = await Cart.find({where: {userId}, include: [ User, {model: CartItem, include: [{model: Product, include: [Image]} ]}]})
        res.json(cart)
    } catch (err) {
        next (err)
    }
})

router.put('/', requireLogin, async (req, res, next) => {
    const userId = req.user.id
    const { productId } = req.body
    try {
        const cart = await Cart.find({where: {userId}, include: [ User, {model: CartItem, include: [{model: Product, include: [Image]} ]}]})
        // await cart.update(underscore.pick(req.body, ['cartItems']))
        const cartItem = await CartItem.create({cartId: cart.id, productId})
        res.json(cartItem)
    } catch (err){
        next(err)
    }
})



module.exports = router;
