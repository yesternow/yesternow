const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  guestId: {
    type: Sequelize.STRING
  },
});

module.exports = Cart;
