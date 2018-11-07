const router = require('express').Router();
const { Address, User } = require('../db/models');
const  db  = require('../db');
const AddressBook = db.models.addressBook

router.get('/', async (req, res, next) => {
    try {
        if(req.user){
            const userId = req.user.id
            const user = await User.findById(userId)
            const addresses = await user.getAddresses()
            res.json(addresses)
        } else {
            res.sendStatus(404)
        }
    }
    catch( err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { address1, address2, city, state, country, zipcode } = req.body
        const address = await Address.create({address1, address2, city, state, country, zipcode})
        if(req.user){
            const userId = req.user.id
            await AddressBook.create({userId, addressId: address.id})
        }
        res.json(address)
    } catch (err) {
        next (err)
    }
})

module.exports = router
