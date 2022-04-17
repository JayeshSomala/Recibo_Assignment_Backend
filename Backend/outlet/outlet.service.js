const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Outlet.findAll();
}

async function getById(id) {
    return await getoutlet(id);
}

async function create(params) {
    // validate
    if (await db.Outlet.findOne({ where: { Name: params.Name } })) {
        throw 'outlet "' + params.Name + '" already exists';
    }

    const outlet = new db.Outlet(params);
    

    // save outlet
    await outlet.save();
}

async function update(id, params) {
    const outlet = await getoutlet(id);

    // validate
    const NameChanged = params.Name && outlet.Name !== params.Name;
    if (NameChanged && await db.Outlet.findOne({ where: { Name: params.Name } })) {
        throw 'outlet "' + params.Name + '" already exists';
    }

    // hash password if it was entered
    // if (params.password) {
    //     params.passwordHash = await bcrypt.hash(params.password, 10);
    // }

    // copy params to outlet and save
    Object.assign(outlet, params);
    await outlet.save();
}

async function _delete(id) {
    const outlet = await getoutlet(id);
    await outlet.destroy();
}

// helper functions

async function getoutlet(id) {
    const outlet = await db.Outlet.findByPk(id);
    if (!outlet) throw 'Outlet not found';
    return outlet;
}
