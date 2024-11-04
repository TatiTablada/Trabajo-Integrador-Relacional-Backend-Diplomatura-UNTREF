const { Contenido, Genero, Actor, Categoria } = require('../models');
const { Op } = require('sequelize');

const getIncludeConfig = (genre, category) => [
    {
        model: Categoria,
        as: 'categorias',
        ...(category && { where: { nombre_categoria: category }, attributes: [] })
    },
    {
        model: Genero,
        as: 'generos',
        ...(genre && { where: { nombre_genero: genre }, attributes: [] })
    },
    {
        model: Actor,
        as: 'actores'
    }
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Contenido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         titulo:
 *           type: string
 *           example: "Título de la película"
 *         resumen:
 *           type: string
 *           example: "Resumen de la película"
 *         temporadas:
 *           type: integer
 *           example: 2
 *         poster:
 *           type: string
 *           example: "url_del_poster.jpg"
 *         trailer:
 *           type: string
 *           example: "url_del_trailer.mp4"
 *         duracion:
 *           type: string
 *           example: "2h 30min"
 *         categoria_id:
 *           type: integer
 *           example: 1
 *         genero_id:
 *           type: integer
 *           example: 1
 */


/**
 * @swagger
 * tags:
 *   - name: Contenido
 *     description: Endpoints para manejar contenidos de películas y series.
 */

/**
 * @swagger
 * /api/contenidos:
 *   get:
 *     summary: Obtener todos los contenidos
 *     tags: [Contenido]
 *     responses:
 *       200:
 *         description: Lista de contenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       500:
 *         description: Error al acceder a la base de datos
 */

const getContenidos = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({ include: getIncludeConfig() });
        res.json(contenidos);
    } catch (error) {
        console.error('Error al obtener contenidos:', error);
        res.status(500).json({ error: 'Database is unavailable', details: error.message });
    }
};

/**
 * @swagger
 * /api/contenido/{id}:
 *   get:
 *     summary: Obtener contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contenido'
 *       404:
 *         description: Contenido no encontrado
 *       500:
 *         description: Error al acceder a la base de datos
 */

const getContenidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const contenido = await Contenido.findByPk(id, { include: getIncludeConfig() });
        if (!contenido) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.json(contenido);
    } catch (error) {
        console.error('Error al obtener el contenido:', error);
        res.status(500).json({ error: 'Database is unavailable', details: error.message });
    }
};

/**
 * @swagger
 * /api/contenidos/filtrar:
 *   get:
 *     summary: Filtrar contenidos por título, género y categoría
 *     tags: [Contenido]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: Título del contenido
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         required: false
 *         description: Género del contenido
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         required: false
 *         description: Categoría del contenido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       404:
 *         description: No hay contenido que coincida con la búsqueda
 *       500:
 *         description: Error al filtrar contenidos
 */

const filterContenidos = async (req, res) => {
    const { title, genre, category } = req.query;
    const whereCondition = title ? { titulo: { [Op.like]: `%${title}%` } } : {};
    const includeConfig = getIncludeConfig(genre, category);

    try {
        const contenidos = await Contenido.findAll({ where: whereCondition, include: includeConfig });
        if (!contenidos.length) {
            return res.status(404).json({ error: 'No hay contenido que coincida con la búsqueda' });
        }
        res.json(contenidos);
    } catch (error) {
        console.error('Error al filtrar contenidos:', error);
        res.status(500).json({ error: 'Error de conexión', details: error.message });
    }
};

/**
 * @swagger
 * /api/contenido:
 *   post:
 *     summary: Crear nuevo contenido
 *     tags: [Contenido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: integer
 *               poster:
 *                 type: string
 *               trailer:
 *                 type: string
 *               duracion:
 *                 type: string
 *               categoria_id:
 *                 type: integer
 *               genero_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contenido'
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error al crear contenido
 */

const createContenido = async (req, res) => {
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
};


/**
 * @swagger
 * /api/contenido/{id}:
 *   put:
 *     summary: Actualizar contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: integer
 *               poster:
 *                 type: string
 *               trailer:
 *                 type: string
 *               duracion:
 *                 type: string
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente
 *       404:
 *         description: Contenido no encontrado
 *       500:
 *         description: Error al actualizar contenido
 */

const updateContenido = async (req, res) => {
    const { id } = req.params;
    const { titulo, resumen, temporadas, poster, trailer, duracion, reparto } = req.body;
    try {
        const contenido = await Contenido.findByPk(id);
        if (!contenido) {
            return res.status(404).json({ error: 'Contenido no disponible' });
        }
        await contenido.update({ titulo, resumen, temporadas, poster, trailer, duracion });

        if (reparto && Array.isArray(reparto)) {
            const actores = await Actor.findAll({ where: { actor_id: { [Op.in]: reparto } } });
            await contenido.addActores(actores);
        }

        res.json(contenido);
    } catch (error) {
        console.error('Error al actualizar contenido:', error);
        res.status(500).json({ error: 'Error al actualizar contenido', details: error.message });
    }
};

/**
 * @swagger
 * /api/contenido/{id}:
 *   delete:
 *     summary: Eliminar contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido eliminado con éxito
 *       404:
 *         description: Contenido no encontrado
 *       500:
 *         description: Error al eliminar contenido
 */

const deleteContenido = async (req, res) => {
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
};

module.exports = {
    getContenidos,
    getContenidoById,
    filterContenidos,
    createContenido,
    updateContenido,
    deleteContenido
};