const express = require('express');
const router = express.Router();
const db = require('../conexion/database');
const { Op } = require('sequelize');
const { sequelize } = require('../conexion/database.js');
const { Contenido, Genero, Actor, Categoria } = require('../models');

// Routes for CRUD
router.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Trailerflix!');
});

router.get('/contenidos', async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            include: [Categoria, Genero, Actor]
        });
        res.json(contenidos);
    } catch (error) {
        console.error('Error al obtener contenidos:', error);
        res.status(500).json({ error: 'Database is unavailable', details: error.message });
    }
});

router.get('/contenido/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contenido = await Contenido.findByPk(id, {
            include: [Categoria, Genero, Actor]
        });
        if (!contenido) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.json(contenido);
    } catch (error) {
        console.error('Error al obtener el contenido:', error);
        res.status(500).json({ error: 'Database is unavailable', details: error.message });
    }
});

router.get('/contenidos/filtrar', async (req, res) => {
    const { title, genre, category } = req.query;
    const whereCondition = title ? { titulo: { [Op.like]: `%${title}%` } } : {};
    const includeCondition = [
        genre && { model: Genero, as: 'generos', where: { nombre_genero: genre }, attributes: [] },
        category && { model: Categoria, as: 'categorias', where: { nombre_categoria: category }, attributes: [] }
    ].filter(Boolean);

    try {
        const contenidos = await Contenido.findAll({ where: whereCondition, include: includeCondition });
        if (!contenidos.length) {
            return res.status(404).json({ error: 'No hay contenido que coincida con la búsqueda' });
        }
        res.json(contenidos);
    } catch (error) {
        console.error('Error al filtrar contenidos:', error);
        res.status(500).json({ error: 'Error de conexión', details: error.message });
    }
});


router.post('/contenido', async (req, res) => {
    const { titulo, resumen, temporadas, poster, trailer, duracion, categoria_id, genero_id } = req.body;
    if (!titulo || !resumen || !poster || !trailer || !categoria_id || !genero_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    try {
        const newContent = await Contenido.create({ titulo, resumen, temporadas, poster, trailer, duracion });

        const categoria = await Categoria.findByPk(categoria_id);
        const genero = await Genero.findByPk(genero_id);

        if (categoria && genero) {
            await newContent.addCategoria(categoria);
            await newContent.addGenero(genero);
        }

        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear contenido nuevo', message: `error: ${error.message}` });
    }
});

router.put('/contenido/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, resumen, temporadas, poster, trailer, duracion, reparto } = req.body;
    try {
        const contenido = await Contenido.findByPk(id);
        if (!contenido) {
            return res.status(404).json({ error: 'Contenido no disponible' });
        }
        await contenido.update({ titulo, resumen, temporadas, poster, trailer, duracion });

        if (reparto && Array.isArray(reparto)) {
            const actores = await Actor.findAll({
                where: {
                    actor_id: { [Op.in]: reparto }
                }
            });
            await contenido.addActors(actores);
        }

        res.json(contenido);
    } catch (error) {
        console.error('Error al actualizar contenido:', error);
        res.status(500).json({ error: 'Error al actualizar contenido', details: error.message });
    }
});

router.delete('/contenido/:id', async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id);
        if (!contenido) {
            return res.status(404).json({ error: 'Contenido no disponible' });
        }
        await contenido.destroy();
        res.json({ message: 'Contenido eliminado con exito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar contenido' });
    }
});

module.exports = router;

