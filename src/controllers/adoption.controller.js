import UserDAO from '../dao/mongo/users.dao.js';
import PetDAO from '../dao/mongo/pets.dao.js';

const usersDAO = new UserDAO();
const petsDAO = new PetDAO();

export const adoptPet = async (req, res) => {
    try {
        const { uid, pid } = req.params;
        const user = await usersDAO.getById(uid);
        const pet = await petsDAO.getById(pid);

        if (!user) return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
        if (!pet) return res.status(404).json({ status: 'error', error: 'Mascota no encontrada' });

        user.pets.push(pet._id);
        await usersDAO.update(uid, { pets: user.pets });

        res.status(200).json({ status: 'success', message: 'Mascota adoptada' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};