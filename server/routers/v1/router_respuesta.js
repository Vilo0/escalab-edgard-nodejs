const express = require('express');

const { respuestaById, preguntaById, getId, listar, listaxPregunta, guardar, actualizar, borrar } = require('../../controllers/v1/controller_respuesta');

const { isAuth, isAdmin } = require('../../middlewares/auth');


/** 
 * @swagger
 * components:
 *   schemas:
 *     Respuesta:
 *       type: object
 *       required:
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         imagen:
 *           type: string
 *         Pregunta:
 *            type: objectId
 */

/**
 * @swagger
 * definitions:
 *   RespuestaBody:
 *     type: object
 *     properties:
 *       nombre:
 *         default: Esta es una respuesta de prueba
 *       descripcion:
 *         default: Descripcion de una respuesta para el demo
 *       imagen:
 *         default: https://respuestaurl.jpg
 *       preguntaId:
 *         default: 600f7167f3200634f40d90dU
 */

/**
 * @swagger
 * definitions:
 *   Respuesta:
 *     type: object
 *     properties:
 *       usuario: 
 *         type: object
 *         properties:
 *           nombre:
 *             default: Edgard
 *           apellido:
 *             default: Vilo
 *           email:
 *             default: thevilos@gmail.com
 *           usuarioId:
 *             default: 601f1570ccb54906a47796d7
 *       disponible:
 *         default: true
 *       _id:
 *         default: 601fe453d6d0885380a0e076
 *       nombre:
 *         default: Esta es una respuesta de prueba
 *       descripcion:
 *         default: Descripcion de una respuesta para el demo
 *       imagen:
 *         default: https://respuestaurl.jpg
 *       preguntaId:
 *         default: 600f7167f3200634f40d90dU
 *       createdAt:
 *         default: 2021-02-07T13:00:04.522Z
 *       updatedAt:
 *         default: 2021-02-07T13:00:04.522Z
 *       __v:
 *         default: 0
 */


/**
 * @swagger
 * definitions:
 *   RespuestaDelete:
 *     type: object
 *     properties:
 *       usuario: 
 *         type: object
 *         properties:
 *           nombre:
 *             default: Edgard
 *           apellido:
 *             default: Vilo
 *           email:
 *             default: thevilos@gmail.com
 *           usuarioId:
 *             default: 601f1570ccb54906a47796d7
 *       disponible:
 *         default: false
 *       _id:
 *         default: 601fe453d6d0885380a0e076
 *       nombre:
 *         default: Esta es una respuesta de prueba
 *       descripcion:
 *         default: Descripcion de una respuesta para el demo
 *       imagen:
 *         default: https://respuestaurl.jpg
 *       preguntaId:
 *         default: 600f7167f3200634f40d90dU
 *       createdAt:
 *         default: 2021-02-07T13:00:04.522Z
 *       updatedAt:
 *         default: 2021-02-07T13:00:04.522Z
 *       __v:
 *         default: 0
 */


const respuesta = '/respuesta';

const router = express.Router();

// params
router.param('respuestaId', respuestaById);
router.param('preguntaId', preguntaById);

// routes
/**
 * @swagger
 * /api/v1/respuesta:
 *   get:
 *     tags:
 *       - Respuesta
 *     description: Retorna todas las respuestas
 *     produces:
 *       - application/json
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un arreglo de respuestas
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
 *                     $ref: '#/definitions/Respuesta'
 */
router.get(respuesta, isAuth, listar);


/**
 * @swagger
 * /api/v1/respuesta/{id}:
 *   get:
 *     tags:
 *       - Respuesta
 *     description: Retorna una respuesta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Respuesta
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un objeto de la respuesta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Respuesta'
 */
router.get(respuesta + '/:respuestaId', isAuth, getId);


/**
 * @swagger
 * /api/v1/respuesta/pregunta/{idPregunta}:
 *   get:
 *     tags:
 *       - Respuesta
 *     description: Retorna todas las respuestas de una pregunta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idPregunta
 *         description: Pregunta
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un arreglo de respuestas
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
 *                     $ref: '#/definitions/Respuesta'
 */
router.get(respuesta + '/pregunta/:preguntaId', isAuth, listaxPregunta);

/**
 * @swagger
 * /api/v1/respuesta:
 *   post:
 *     tags:
 *       - Respuesta
 *     description: Agrega una respuesta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Respuesta
 *         description: Objeto de respuesta
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RespuestaBody'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Respuesta ingresada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Respuesta'
 */
router.post(respuesta + '/usuario/:usuarioId', [isAuth, isAdmin], guardar);


/**
 * @swagger
 * /api/v1/respuesta/{id}:
 *   put:
 *     tags: 
 *       - Respuesta
 *     description: Actualiza una respuesta
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Respuesta
 *         in: path
 *         required: true
 *         type: string
 *       - name: Respuesta
 *         in: body
 *         description: Datos para actualizar la respuesta
 *         schema:
 *           type: object
 *           $ref: '#/definitions/RespuestaBody'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Respuesta actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Respuesta'
 */
router.put(respuesta + '/:respuestaId', [isAuth, isAdmin], actualizar);


/**
 * @swagger
 * /api/v1/respuesta/{id}:
 *   delete:
 *     tags:
 *       - Respuesta
 *     description: Elimina una respuesta
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Respuesta
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Respuesta eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/RespuestaDelete'
 */
router.delete(respuesta + '/:respuestaId', [isAuth, isAdmin], borrar);

module.exports = router;