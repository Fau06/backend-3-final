import petModel from '../models/pets.model.js';

export default class PetDAO {
    getAll = async () => {
        return await petModel.find().lean();
    }
    create = async (petData) => {
        return await petModel.create(petData);
    }
    getById = async (id) => {
        return await petModel.findById(id).lean();
    }
}