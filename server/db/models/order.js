const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    guestId: {
        type: Sequelize.INTEGER
    },
    tracking: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM(['created', 'processing', 'cancelled', 'shipped', 'delivered']),
        defaultValue: 'created'
    },
    guestEmail: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    guestNumber: {
        type: Sequelize.STRING
    }
})

module.exports = Order
