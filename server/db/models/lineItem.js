const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
    quantity: {
        type: Sequelize.NUMBER,
        validate: {
            min: 0
        }
    },
    price: {
        type: Sequelize.NUMBER,
        validate: {
            min:0
        }
    }
})

module.exports = LineItem
