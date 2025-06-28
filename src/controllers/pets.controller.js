import PetDAO from '../dao/mongo/pets.dao.js';

const petsDAO = new PetDAO();

export const getPets = async (req, res) => {
    try {
        const pets = await petsDAO.getAll();
        res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const createPet = async (req, res) => {
    try {
        const { name, species } = req.body;
        if (!name || !species) {
            return res.status(400).json({ status: 'error', error: 'Datos incompletos' });
        }
        const newPet = { name, species };
        const result = await petsDAO.create(newPet);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};