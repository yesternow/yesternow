/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	describe('/api/products/', () => {
		const product = {
			title: 'Mystery Box',
			description: 'there is a mystery inside!',
			price: 50000,
			quantity: 10,
			dimensions: "10x10x10'",
			weight: 2,
			brand: 'Deepmind'
		};

		beforeEach(() => {
			return Product.create(product);
		});

		it('GET /api/products', async () => {
			const res = await request(app).get('/api/products').expect(200);

			expect(res.body).to.be.an('array');
			expect(res.body[0].title).to.be.equal('Mystery Box');
		});
	}); // end describe('/api/products')
}); // end describe('Product routes')
