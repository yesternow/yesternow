'use strict';

const db = require('../server/db');
const { User, Product, Order, Review, Image, Cart, LineItem, CartItem, Category, Address } = require('../server/db/models');
const Tag = db.models.tags
const AddressBook = db.models.addressBook

const usersData = require('../seedData/users.json')
const productsData = require('../seedData/products.json')
const reviewsData = require('../seedData/reviews.json')
const addressesData = require('../seedData/addresses.json')
const ordersData = require('../seedData/orders.json')
const imagesData = require('../seedData/images.json')
const categoriesData = require('../seedData/categories.json')
const lineItemsData = require('../seedData/lineitems.json')
const cartItemsData = require('../seedData/cartItems.json')
const cartsData = require('../seedData/carts.json')

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  usersData.forEach(async user => await User.create(user))
  await Product.bulkCreate(productsData)
  await Review.bulkCreate(reviewsData)
  await Address.bulkCreate(addressesData)
  await Order.bulkCreate(ordersData)
  await Image.bulkCreate(imagesData)
  await Category.bulkCreate(categoriesData)
  await Cart.bulkCreate(cartsData)
  await LineItem.bulkCreate(lineItemsData)
  await CartItem.bulkCreate(cartItemsData)

  await Tag.bulkCreate([
    {productId: 1, categoryId:1},
    {productId: 2, categoryId:3},
    {productId: 3, categoryId:3},
    {productId: 3, categoryId:1},
    {productId: 3, categoryId:5},
    {productId: 4, categoryId:3}
  ])

  await AddressBook.bulkCreate([
    {userId:2, addressId:3},
    {userId:3, addressId:1},
    {userId:4, addressId:2}
  ])

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
