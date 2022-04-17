const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Name: { type: DataTypes.STRING, allowNull: false },
        Cost: { type: DataTypes.INTEGER, allowNull: false }
    };

    // const options = {
    //     defaultScope: {
    //         // exclude password hash by default
    //         attributes: { exclude: ['passwordHash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };

    return sequelize.define('Outlet', attributes);
}