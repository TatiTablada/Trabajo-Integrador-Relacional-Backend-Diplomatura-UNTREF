// Model for Categoria
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database.js');

const Categoria = sequelize.define('Categoria', {
    categoria_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categorias',
    timestamps: false
});

module.exports = Categoria;


