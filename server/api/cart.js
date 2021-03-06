const router = require("express").Router();
const { Cart, CartItem, User, Product, Image } = require("../db/models");

router.get('/', async (req, res, next) => {
    if(req.user){
        const userId = req.user.id
        try{
            const cart = await Cart.find({where: {userId}, include: [ User, {model: CartItem, include: [{model: Product, include: [Image]} ]}]})
            res.json(cart)
        } catch (err) {
            next (err)
        }
    } else {
        try{
            const cart = await Cart.findOrCreate({where: {guestId: req.session.id}, defaults: {guestId: req.session.id}, include: [ User, {model: CartItem, include: [{model: Product, include: [Image]} ]}]})
            res.json(cart[0])
        } catch(err) {
            next(err)
        }
    }
})

router.post('/', async (req, res, next) => {

    try {
        const userId = req.body.userId
        const guestCart = await Cart.findOne({where: {guestId: req.session.id}})
        const cartItems = await CartItem.findAll({where: {cartId: guestCart.id}})
        if(cartItems.length){
            guestCart.userId = userId
            res.json(guestCart)
        } else {
            const cart = await Cart.create({userId})
            await guestCart.destroy()
            res.json(cart)

        }

    } catch (err) {
        next(err)
    }

})

router.put('/', async (req, res, next) => {

    try {
        const { quantity, productId, cartId } = req.body
        let cartItem = await CartItem.findOne({where: {productId, cartId}})
        if(cartItem) {
            const total = quantity + cartItem.quantity
            await cartItem.update({quantity: total})
        } else {
            cartItem = await CartItem.create({quantity, productId, cartId})
        }
        res.json(cartItem)
    } catch (err){
        next(err)
    }
})

router.delete('/:cartItemId', async (req, res, next) => {
    try {
        await CartItem.destroy({where: {id: req.params.cartItemId}})
        res.sendStatus(204)
    } catch (err){
        next(err)
    }
})


module.exports = router;
