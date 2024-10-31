// Model for Genero
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database.js');

const Genero = sequelize.define('Genero', {
    genero_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_genero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Géneros',
    timestamps: false
});

module.exports = Genero;

