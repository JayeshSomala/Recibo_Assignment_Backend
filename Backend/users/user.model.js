const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Name: { type: DataTypes.STRING, allowNull: false },
        Phone: { type: DataTypes.DOUBLE, allowNull: false },
        Manager: { type: DataTypes.STRING, allowNull: false}
    };

    return sequelize.define('User', attributes);
}