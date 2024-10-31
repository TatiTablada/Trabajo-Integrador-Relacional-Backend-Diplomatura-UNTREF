// Model for Actor
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database.js');

const Actor = sequelize.define('Actor', {
    actor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_actor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Actores',
    timestamps: false
});

module.exports = Actor;
