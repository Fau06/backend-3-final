import { generateUsers } from '../utils/mocking.js';
import UserDAO from '../dao/mongo/users.dao.js';

const userDAO = new UserDAO();

export const getMockingUsers = (req, res) => {
    try {
        const users = generateUsers(50); // Generar 50 usuarios
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const postGenerateData = async (req, res) => {
    try {
        const { users: numUsers } = req.body;
        if (!numUsers || isNaN(numUsers)) {
            return res.status(400).json({ status: 'error', error: 'Parámetro "users" inválido' });
        }

        const mockUsers = generateUsers(parseInt(numUsers));
        for (const user of mockUsers) {
            await userDAO.create(user);
        }

        res.status(201).json({ status: 'success', message: `${numUsers} usuarios generados e insertados.` });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};