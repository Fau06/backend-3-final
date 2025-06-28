import UserDAO from '../dao/mongo/users.dao.js';
import { createHash } from '../utils/bcrypt.js';

const usersDAO = new UserDAO();

export const getUsers = async (req, res) => {
    try {
        const users = await usersDAO.getAll();
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ status: 'error', error: 'Datos incompletos' });
        }
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        };
        const result = await usersDAO.create(newUser);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};