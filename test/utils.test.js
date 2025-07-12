import { expect } from 'chai';
import { createHash, isValidPassword } from '../src/utils/bcrypt.js';
import { generateUsers } from '../src/utils/mocking.js';

describe('Utils: bcrypt', () => {
  it('createHash debe generar un hash diferente al texto plano', () => {
    const password = 'test123';
    const hash = createHash(password);
    expect(hash).to.be.a('string');
    expect(hash).to.not.equal(password);
  });

  it('isValidPassword debe validar correctamente el password', () => {
    const password = 'test123';
    const user = { password: createHash(password) };
    expect(isValidPassword(user, password)).to.be.true;
    expect(isValidPassword(user, 'otro')).to.be.false;
  });
});

describe('Utils: mocking', () => {
  it('generateUsers debe generar la cantidad correcta de usuarios', () => {
    const users = generateUsers(5);
    expect(users).to.be.an('array').with.lengthOf(5);
    users.forEach(user => {
      expect(user).to.have.all.keys('first_name', 'last_name', 'email', 'password', 'role', 'pets');
    });
  });
}); 