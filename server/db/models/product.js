const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT
	},
	imageUrl: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: [ 'http://products.ideadunes.com/assets/images/default_product.jpg' ]
	},
	price: {
		//Unit type is cents
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0
		}
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0
		}
	},
	isActive: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	isAvailable: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	isFeatured: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	weight: {
		//Unit type is pounds
		type: Sequelize.NUMBER,
		allowNull: false,
		validate: {
			min: 0
		}
	},
	dimensions: {
		//Unit type is inches
		//Informational for user more than functional parameter
		type: Sequelize.STRING
	},
	brand: {
		type: Sequelize.STRING
	}
});

module.exports = Product;
