// Model for Contenido
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database.js');

const Contenido = sequelize.define('Contenido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    temporadas: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
    trailer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duracion: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'Contenido',
    timestamps: false
});

module.exports = Contenido;


