const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  title: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: [
      'http://products.ideadunes.com/assets/images/default_product.jpg',
    ],
  },
});

module.exports = Image;
