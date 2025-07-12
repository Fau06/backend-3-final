import { expect } from 'chai';
import sinon from 'sinon';
import UserDAO from '../src/dao/mongo/users.dao.js';
import PetDAO from '../src/dao/mongo/pets.dao.js';
import userModel from '../src/dao/models/users.model.js';
import petModel from '../src/dao/models/pets.model.js';

describe('UserDAO', () => {
  let userDao;
  beforeEach(() => {
    userDao = new UserDAO();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('getAll debe retornar usuarios', async () => {
    const fakeUsers = [{ email: 'test@mail.com' }];
    sinon.stub(userModel, 'find').returns({ lean: () => fakeUsers });
    const result = await userDao.getAll();
    expect(result).to.eql(fakeUsers);
  });

  it('create debe crear un usuario', async () => {
    const userData = { email: 'nuevo@mail.com' };
    sinon.stub(userModel, 'create').resolves(userData);
    const result = await userDao.create(userData);
    expect(result).to.eql(userData);
  });

  it('getById debe retornar un usuario por id', async () => {
    const fakeUser = { _id: '123', email: 'test@mail.com' };
    sinon.stub(userModel, 'findById').returns({ lean: () => fakeUser });
    const result = await userDao.getById('123');
    expect(result).to.eql(fakeUser);
  });

  it('update debe actualizar un usuario', async () => {
    const updatedUser = { _id: '123', email: 'actualizado@mail.com' };
    sinon.stub(userModel, 'findByIdAndUpdate').resolves(updatedUser);
    const result = await userDao.update('123', { email: 'actualizado@mail.com' });
    expect(result).to.eql(updatedUser);
  });
});

describe('PetDAO', () => {
  let petDao;
  beforeEach(() => {
    petDao = new PetDAO();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('getAll debe retornar mascotas', async () => {
    const fakePets = [{ name: 'Firulais' }];
    sinon.stub(petModel, 'find').returns({ lean: () => fakePets });
    const result = await petDao.getAll();
    expect(result).to.eql(fakePets);
  });

  it('create debe crear una mascota', async () => {
    const petData = { name: 'Bobby' };
    sinon.stub(petModel, 'create').resolves(petData);
    const result = await petDao.create(petData);
    expect(result).to.eql(petData);
  });

  it('getById debe retornar una mascota por id', async () => {
    const fakePet = { _id: 'abc', name: 'Luna' };
    sinon.stub(petModel, 'findById').returns({ lean: () => fakePet });
    const result = await petDao.getById('abc');
    expect(result).to.eql(fakePet);
  });
}); 