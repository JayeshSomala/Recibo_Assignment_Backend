﻿const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { Name: params.Name } })) {
        throw 'User "' + params.Name + '" is already registered';
    }

    const user = new db.User(params);
    
    // save user
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const NameChanged = params.Name && user.Name !== params.Name;
    if (NameChanged && await db.User.findOne({ where: { Name: params.Name } })) {
        throw 'User "' + params.Name + '" is already registered';
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
