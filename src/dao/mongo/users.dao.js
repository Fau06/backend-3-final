import userModel from '../models/users.model.js';

export default class UserDAO {
    getAll = async () => {
        return await userModel.find().lean();
    }
    create = async (userData) => {
        return await userModel.create(userData);
    }
    getById = async (id) => {
        return await userModel.findById(id).lean();
    }
    update = async (id, userData) => {
        return await userModel.findByIdAndUpdate(id, userData, { new: true });
    }
}