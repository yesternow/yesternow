const {expect} = require('chai');
const db = require('../index');
const Address = db.model('address');

describe('Address model', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	it('has fields address1, address2, city, state, country, zipcode', () => {
		const address = Address.build({
			address1: 'Mystery Box',
			address2: 'there is a mystery inside!',
			city: 'Chicago',
			state: 'IL',
			country: 'USA',
			zipcode: 60610
		});

		expect(address.address1).to.equal('Mystery Box');
		expect(address.city).to.equal('Chicago');
	});

	it('Requires address1, city, state, country, zipcode', async () => {
		const address = Address.build({});
		let result, error;
		try {
			result = await address.validate();
		} catch (err) {
			error = err;
		}
		if (result) {
			throw Error('validation should fail when title, price, quantity or weight is null');
		}

		expect(error).to.be.an.instanceOf(Error);
	});
});
