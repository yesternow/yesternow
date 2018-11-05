const User = require('./user');
const Product = require('./product');
const Address = require('./address');
const Review = require('./review');
const Category = require('./category');
const Image = require('./image');
const Cart = require('./cart');
const CartItem = require('./cartItem');
const LineItem = require('./lineItem');
const Order = require('./order');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Cart.hasMany(CartItem);
Cart.belongsTo(User);
Order.belongsTo(Address);
Order.hasMany(LineItem);

User.hasMany(Review);
Product.hasMany(Review);
Review.belongsTo(User)
Review.belongsTo(Product)

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Category, {through: 'tags'});
Category.belongsToMany(Product, {through: 'tags'});

User.belongsToMany(Address, {through: 'addressBook'});
Address.belongsToMany(User, {through: 'addressBook'});
Product.hasMany(CartItem);

LineItem.belongsTo(Product);
Product.hasMany(LineItem);
Image.belongsTo(Product);

CartItem.belongsTo(Product);

Product.hasMany(Image);
Image.belongsTo(Product);
Review.hasMany(Image);
Image.belongsTo(Review);

module.exports = {
	User,
	Product,
	Address,
	Review,
	Category,
	Image,
	Cart,
	CartItem,
	LineItem,
	Order
};
