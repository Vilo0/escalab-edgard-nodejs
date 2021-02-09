const express = require('express');

const { preguntaById, leccionById, getId, listar, listaxLeccion, guardar, actualizar, borrar } = require('../../controllers/v1/controller_pregunta');

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
 *         leccionId:
 *            type: string
 */

/**
 * @swagger
 * definitions:
 *   Pregunta:
 *     type: object
 *     properties:
 *       disponible:
 *         default: true
 *       _id:
 *         default: 6021ee13d6b72672e04db691
 *       usuario:
 *         type: object
 *         properties:
 *           nombre:
 *             default: Edgard
 *           apellido:
 *             default: Vilo
 *           email:
 *             default: escalab@mail.com
 *           usuarioId:
 *             default: 60173205dbef124a2cc44de9
 *       nombre:
 *         default: Esta es una pregunta de prueba
 *       descripcion:
 *         default: Descripcion de una pregunta para el demo
 *       imagen:
 *         default: https://preguntaurl.jpg
 *       leccionId:
 *         default: 600f7167f3200634f40d90d8
 *       createdAt:
 *         default: 2021-02-09T02:06:12.447Z
 *       updatedAt:
 *         default: 2021-02-09T02:06:12.447Z
 *       __v:
 *         default: 0
 */

/**
 * @swagger
 * definitions:
 *   PreguntaDelete:
 *     type: object
 *     properties:
 *       disponible:
 *         default: false
 *       _id:
 *         default: 6021ee13d6b72672e04db691
 *       usuario:
 *         type: object
 *         properties:
 *           nombre:
 *             default: Edgard
 *           apellido:
 *             default: Vilo
 *           email:
 *             default: escalab@mail.com
 *           usuarioId:
 *             default: 60173205dbef124a2cc44de9
 *       nombre:
 *         default: Esta es una pregunta de prueba
 *       descripcion:
 *         default: Descripcion de una pregunta para el demo
 *       imagen:
 *         default: https://preguntaurl.jpg
 *       leccionId:
 *         default: 600f7167f3200634f40d90d8
 *       createdAt:
 *         default: 2021-02-09T02:06:12.447Z
 *       updatedAt:
 *         default: 2021-02-09T02:06:12.447Z
 *       __v:
 *         default: 0
 */
const pregunta = '/pregunta';

const router = express.Router();

// params
router.param('preguntaId', preguntaById);
router.param('leccionId', leccionById);

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
 *     security:
 *	     - jwt: []
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
 * /api/v1/pregunta/leccion/{idLeccion}:
 *   get:
 *     tags:
 *       - Pregunta
 *     description: Retorna todas las preguntas de una leccion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idLeccion
 *         description: Leccion
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
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
router.get(pregunta + '/leccion/:leccionId', [isAuth, isAdmin], listaxLeccion);


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
 *                   $ref: '#/definitions/PreguntaDelete'
 */
router.delete(pregunta + '/:preguntaId', isAuth, borrar);

module.exports = router;