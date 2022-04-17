const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getproduct(id);
}

async function create(params) {
    // validate
    if (await db.Product.findOne({ where: { Name: params.Name } })) {
        throw 'product "' + params.Name + '" already exists';
    }

    const product = new db.Product(params);
    

    // save product
    await product.save();
}

async function update(id, params) {
    const product = await getproduct(id);

    // validate
    const NameChanged = params.Name && product.Name !== params.Name;
    if (NameChanged && await db.Product.findOne({ where: { Name: params.Name } })) {
        throw 'product "' + params.Name + '" already exists';
    }

    // hash password if it was entered
    // if (params.password) {
    //     params.passwordHash = await bcrypt.hash(params.password, 10);
    // }

    // copy params to product and save
    Object.assign(product, params);
    await product.save();
}

async function _delete(id) {
    const product = await getproduct(id);
    await product.destroy();
}

// helper functions

async function getproduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}
