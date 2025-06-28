import { faker } from '@faker-js/faker';
import { createHash } from './bcrypt.js';

export const generateUsers = (numOfUsers) => {
    const users = [];
    for (let i = 0; i < numOfUsers; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: createHash('coder123'),
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }
    return users;
};