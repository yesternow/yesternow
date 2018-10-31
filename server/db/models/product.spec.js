const {expect} = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	it('has fields title, imageUrl, description, price, quantity, isActive, isAvailable, isFeatured, weight, dimensions, brand', () => {
		const product = Product.build({
			title: 'Mystery Box',
			description: 'there is a mystery inside!',
			price: 50000,
			quantity: 10,
			dimensions: "10x10x10'",
			weight: 2,
			brand: 'Deepmind'
		});

		expect(product.title).to.equal('Mystery Box');
		expect(product.description).to.equal('there is a mystery inside!');
		expect(product.price).to.equal(50000);
		expect(product.isActive).to.equal(false);
	});

	it('Requires title, price, quantity, weight', async () => {
		const product = Product.build({});
		let result, error;
		try {
			result = await product.validate();
		} catch (err) {
			error = err;
		}
		if (result) {
			throw Error('validation should fail when title, price, quantity or weight is null');
		}

		expect(error).to.be.an.instanceOf(Error);
	});
});
