const express = require('express');

const { preguntaById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_pregunta');

const { isAuth, isAdmin } = require('../../middlewares/auth');


/** 
 * @swagger
 * components:
 *   schemas:
 *     Pregunta:
 *       type: object
 *       required:
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         documento:
 *           type: string
 *         Curso:
 *            type: objectId
 */

/**
 * @swagger
 * definitions:
 *   Pregunta:
 *     type: object
 *     properties:
 *       nombre:
 *         default: Esta es una pregunta de prueba
 *       descripcion:
 *         default: Descripcion de una pregunta para el demo
 *       imagen:
 *         default: https://preguntaurl.jpg
 *       Curso:
 *         default: 600f7167f3200634f40d90d8
 */
const pregunta = '/pregunta';

const router = express.Router();

// params
router.param('preguntaId', preguntaById);

// routes

/**
 * @swagger
 * /api/v1/pregunta:
 *   get:
 *     tags:
 *       - Pregunta
 *     description: Retorna todas las preguntas
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Un arreglo de preguntas
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
 *                     $ref: '#/definitions/Pregunta'
 */
router.get(pregunta, isAuth, listar);


/**
 * @swagger
 * /api/v1/pregunta/{id}:
 *   get:
 *     tags:
 *       - Pregunta
 *     description: Retorna una pregunta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Pregunta
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un objeto de la pregunta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Pregunta'
 */
router.get(pregunta + '/:preguntaId', isAuth, getId);


/**
 * @swagger
 * /api/v1/pregunta:
 *   post:
 *     tags:
 *       - Pregunta
 *     description: Agrega una pregunta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Pregunta
 *         description: Objeto de pregunta
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Pregunta'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Pregunta ingresada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Pregunta'
 */
router.post(pregunta + '/usuario/:usuarioId', isAuth, guardar);


/**
 * @swagger
 * /api/v1/pregunta/{id}:
 *   put:
 *     tags: 
 *       - Pregunta
 *     description: Actualiza una pregunta
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Pregunta
 *         in: path
 *         required: true
 *         type: string
 *       - name: Pregunta
 *         in: body
 *         description: Datos para actualizar la pregunta
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Pregunta'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Pregunta actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Pregunta'
 */
router.put(pregunta + '/:preguntaId', isAuth, actualizar);


/**
 * @swagger
 * /api/v1/pregunta/{id}:
 *   delete:
 *     tags:
 *       - Pregunta
 *     description: Elimina una pregunta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Pregunta
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Pregunta eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Pregunta'
 */
router.delete(pregunta + '/:preguntaId', isAuth, borrar);

module.exports = router;