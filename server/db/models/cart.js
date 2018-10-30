const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
    guestId: {
        type: Sequelize.INTEGER
    }
})

module.exports = Cart
