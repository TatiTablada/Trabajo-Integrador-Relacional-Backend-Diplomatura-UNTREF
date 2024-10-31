const sequelize = require('../conexion/database');
const Contenido = require('./contenido');
const Categoria = require('./categoria');
const Genero = require('./genero');
const Actor = require('./actor');


Contenido.belongsToMany(Categoria, {
    through: 'contenido_categorias',
    foreignKey: 'contenido_id',
    otherKey: 'categoria_id',
    as: 'categorias',
    timestamps: false
});

Categoria.belongsToMany(Contenido, {
    through: 'contenido_categorias',
    foreignKey: 'categoria_id',
    otherKey: 'contenido_id',
    as: 'contenidos',
    timestamps: false
});

Contenido.belongsToMany(Genero, {
    through: 'contenido_generos',
    foreignKey: 'contenido_id',
    otherKey: 'genero_id',
    as: 'generos',
    timestamps: false
});

Genero.belongsToMany(Contenido, {
    through: 'contenido_generos',
    foreignKey: 'genero_id',
    otherKey: 'contenido_id',
    as: 'contenidos',
    timestamps: false
});

Contenido.belongsToMany(Actor, {
    through: 'Contenido_actores',
    foreignKey: 'contenido_id',
    otherKey: 'actor_id',
    as: 'actores',
    timestamps: false
});

Actor.belongsToMany(Contenido, {
    through: 'Contenido_actores',
    foreignKey: 'actor_id',
    otherKey: 'contenido_id',
    as: 'contenidos',
    timestamps: false
});

module.exports = {
    Contenido,
    Categoria,
    Genero,
    Actor,
    sequelize,
};


