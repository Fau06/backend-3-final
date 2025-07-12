import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Rutas principales de la API', () => {
  // USERS
  describe('/api/users', () => {
    it('GET /api/users debe devolver usuarios', async () => {
      const res = await requester.get('/api/users');
      expect(res.statusCode).to.be.oneOf([200, 201]);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    });
  });

  // PETS
  describe('/api/pets', () => {
    it('GET /api/pets debe devolver mascotas', async () => {
      const res = await requester.get('/api/pets');
      expect(res.statusCode).to.be.oneOf([200, 201]);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    });
  });

  describe('/api/adoption', () => {
    it('POST /api/adoption/:uid/:pid debe intentar adoptar una mascota', async () => {
      const userId = '686043484c62bdaf2732f59f';
      const petId = '686043664c62bdaf2732f5a1';
      const res = await requester.post(`/api/adoption/${userId}/${petId}`);
      expect(res.statusCode).to.be.oneOf([200, 400, 404]);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    });
  });

  describe('/api/mocks', () => {
    it('GET /api/mocks/users debe devolver usuarios mock', async function () {
      this.timeout(5000);
      const res = await requester.get('/api/mocks/users');
      expect(res.statusCode).to.be.oneOf([200, 201]);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
    });
  });
}); 