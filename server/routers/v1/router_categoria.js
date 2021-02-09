const express = require('express');

const { categoriaById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_categoria');

const { isAdmin, isAuth } = require('../../middlewares/auth');

/** 
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required:
 *       properties:
 *         nombre:
 *           type: string
 *       example:
 *          nombre: Desarrollo Web
 */

/**
 * @swagger
 * definitions:
 *   Categoria:
 *     type: object
 *     properties:
 *       disponible:
 *         default: true
 *       _id: 
 *         default: 60157b26b00f6640dcebd141
 *       nombre:
 *         default: "Desarrollo Web"
 *       createdAt:
 *         default: 2021-01-30T15:28:38.315Z
 *       updatedAt:
 *         default: 2021-01-31T18:39:54.826Z
 *       __v:
 *         default: 0
 */

/**
 * @swagger
 * definitions:
 *   CategoriaDelete:
 *     type: object
 *     properties:
 *       disponible:
 *         default: false
 *       _id: 
 *         default: 60157b26b00f6640dcebd141
 *       nombre:
 *         default: "Desarrollo Web"
 *       createdAt:
 *         default: 2021-01-30T15:28:38.315Z
 *       updatedAt:
 *         default: 2021-01-31T18:39:54.826Z
 *       __v:
 *         default: 0
 */

/**
 * @swagger
 * definitions:
 *   CategoriaCrud:
 *     type: object
 *     properties:
 *       nombre:
 *         default: "Desarrollo Web"
 */
const categoria = '/categoria'

const router = express.Router();

// params
router.param('categoriaId', categoriaById);

// routes
/**
 * @swagger
 * /api/v1/categoria:
 *   get:
 *     tags:
 *       - Categoria
 *     description: Retorna todas las categorias
 *     produces:
 *       - application/json
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un arreglo de categorias
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/definitions/Categoria'
 */
router.get(categoria, isAuth, listar);

/**
 * @swagger
 * /api/v1/categoria/{id}:
 *   get:
 *     tags:
 *       - Categoria
 *     description: Retorna una categoria
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Categoria
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un objeto de la categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Categoria'
 */
router.get(categoria + '/:categoriaId', getId);


/**
 * @swagger
 * /api/v1/categoria:
 *   post:
 *     tags:
 *       - Categoria
 *     description: Agrega una categoría
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Categoria
 *         description: Objeto de categoria
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CategoriaCrud'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Categoria ingresada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Categoria'
 */
router.post(categoria, [isAuth, isAdmin], guardar);


/**
 * @swagger
 * /api/v1/categoria/{id}:
 *   put:
 *     tags: 
 *       - Categoria
 *     description: Actualiza una categoria
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Categoria
 *         in: path
 *         required: true
 *         type: string
 *       - name: Categoria
 *         in: body
 *         description: Datos para actualizar la categoria
 *         schema:
 *           type: object
 *           $ref: '#/definitions/CategoriaCrud'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Categoria actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Categoria'
 */
router.put(categoria + '/:categoriaId', [isAuth, isAdmin], actualizar);


/**
 * @swagger
 * /api/v1/categoria/{id}:
 *   delete:
 *     tags:
 *       - Categoria
 *     description: Borra una categoria
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Categoria
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Categoria eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/CategoriaDelete'
 */
router.delete(categoria + '/:categoriaId', [isAuth, isAdmin], borrar);

module.exports = router;