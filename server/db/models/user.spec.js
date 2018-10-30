/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let admin;

      beforeEach(async () => {
        admin = await User.create({
          email: 'admin@admin.com',
          password: 'admin',
          firstName: 'admin',
          lastName: 'admin',
        });
      });

      it('returns true if the password is correct', () => {
        expect(admin.correctPassword('admin')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(admin.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')

    describe('first and last name', () => {
      it('first name is required', async () => {
        const user = User.build({
          firstName: null,
          lastName: 'last Name',
          email: 'email@email.com',
        });

        let result, error;
        try {
          result = await user.validate();
        } catch (err) {
          error = err;
        }

        if (result) throw Error('validation should fail when content is null');

        expect(error).to.be.an.instanceOf(Error);
      });

      it('last name is required', async () => {
        const user = User.build({
          firstName: 'first Name',
          lastName: null,
          email: 'email@email.com',
        });

        let result, error;
        try {
          result = await user.validate();
        } catch (err) {
          error = err;
        }

        if (result) throw Error('validation should fail when content is null');

        expect(error).to.be.an.instanceOf(Error);
      });

      it('first name cannot be empty', async () => {
        const user = User.build({
          firstName: '',
          lastName: '',
          email: 'email@email.com',
        });
        try {
          await user.validate();
        } catch (err) {
          expect(err.message).to.contain('Validation notEmpty on firstName');
          expect(err.message).to.contain('Validation notEmpty on lastName');
        }
      });
    });

    describe('email', () => {
      it('email is required', async () => {
        const user = User.build({
          firstName: 'first',
          lastName: 'last',
          email: null,
        });
        let result, error;

        try {
          result = await user.validate();
        } catch (err) {
          error = err;
        }

        if (result) throw Error('validation should fail when content is null');
        expect(error).to.be.an.instanceOf(Error);
      });

      it('email is real email', async () => {
        const user = User.build({
          firstName: 'first',
          lastName: 'last',
          email: 'thisIsNotEmail',
        });
        let result, error;

        try {
          result = await user.validate();
        } catch (err) {
          error = err;
        }
        if (result)
          throw Error('validation should fail when email is not valid');
        expect(error).to.be.an.instanceOf(Error);
      });

      it('email should be unique', async () => {
        const user1 = await User.create({
          firstName: 'first',
          lastName: 'last',
          email: 'email@email.com',
        });
        try {
          const user2 = await User.create({
            firstName: 'first4',
            lastName: 'last4',
            email: 'email@email.com',
          });
          throw Error('error');
        } catch (err) {
          expect(err.message).to.contain('Validation error');
        }
        await user1.destroy();
      });
    });

    describe('imageUrl', () => {
      it('imageUrl has a default value', async () => {
        const user = User.build({
          firstName: 'first',
          lastName: 'last',
          email: 'admin@admin.com',
        });

        expect(user.imageUrl).to.equal('/default.jpeg');
      });
    });

    describe('isAdmin', () => {
      it('isAdmin has a default value false', async () => {
        const user = User.build({
          firstName: 'first',
          lastName: 'last',
          email: 'user@user.com',
        });

        expect(user.isAdmin).to.be.false;
      });
    });
  }); // end describe('instanceMethods')
}); // end describe('User model')
