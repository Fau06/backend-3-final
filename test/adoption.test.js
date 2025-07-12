import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

const requester = supertest('http://localhost:8080');

describe('Testing del Módulo de Adopción', () => {

    it('Debe poder adoptar una mascota (POST /api/adoption/:uid/:pid)', async function () {
        this.timeout(5000);

        const userId = '686043484c62bdaf2732f59f';
        const petId = '686043664c62bdaf2732f5a1';

        const { statusCode, _body } = await requester.post(`/api/adoption/${userId}/${petId}`);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('status', 'success');
        expect(_body).to.have.property('message', 'Mascota adoptada');
    });
});
