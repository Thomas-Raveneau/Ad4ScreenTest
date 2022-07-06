import User from './model.js';

const createUser = async (data) => {
    return User.create(data);
}

const getUserById = (userId) => {
    return User.findOne({
        where: {
            id: userId
        }, attributes: ['id', 'name', 'descriptionMaxSize', 'createdAt', 'updatedAt']
    });
};

const getUsers = (page) => {
    return User.findAndCountAll({
        limit: 5,
        offset: Number(page) * 5
    })
};

const updateUser = async (userId, data) => {
    const user = await getUserById(userId);

    if (!user) {
        throw `User #${userId} not found`;
    }

    user.set(data);

    return user.save();
};

const deleteUser = (userId) => {
    return User.destroy({ where: { id: userId } });
};

const service = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};

export default service;