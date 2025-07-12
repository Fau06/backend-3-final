import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Testing del Módulo de Adopción', () => {
    it('Debe poder adoptar una mascota (POST /api/adoption/:uid/:pid)', async function () {
        this.timeout(5000);

        // Crear usuario
        const userRes = await requester.post('/api/users').send({
            first_name: 'Test',
            last_name: 'User',
            email: `testuser${Date.now()}@mail.com`,
            password: 'test123'
        });
        const userId = userRes.body?.payload?._id || userRes.body?._id;

        // Crear mascota
        const petRes = await requester.post('/api/pets').send({
            name: 'Firulais',
            species: 'Perro',
            birthDate: '2020-01-01'
        });
        const petId = petRes.body?.payload?._id || petRes.body?._id;

        // Intentar adopción
        const { statusCode, _body } = await requester.post(`/api/adoption/${userId}/${petId}`);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('status', 'success');
        expect(_body).to.have.property('message', 'Mascota adoptada');
    });
});
