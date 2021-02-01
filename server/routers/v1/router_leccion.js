const express = require('express');

const { leccionById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_leccion');

const { isAuth, isAdmin } = require('../../middlewares/auth');


/** 
 * @swagger
 * components:
 *   schemas:
 *     Leccion:
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
 *   Leccion_Body:
 *     type: object
 *     properties:
 *       nombre:
 *         default: Variables var vs let
 *       descripcion:
 *         default: Mas información proximamente
 *       imagen:
 *         default: https//leccionUrl.jpg
 *       cursoId:
 *         default: 600c6ecf74dd6279c434e560
 */

/**
 * @swagger
 * definitions:
 *   Leccion:
 *     type: object
 *     properties:
 *       disponible:
 *         default: true
 *       _id:
 *         default: 600ccf052599bb0015fa95c4
 *       nombre:
 *         default: Variables var vs let
 *       descripcion:
 *         default: Mas información proximamente
 *       imagen:
 *         default: https//leccionUrl.jpg
 *       cursoId:
 *         default: 600c6ecf74dd6279c434e560
 */
const leccion = '/leccion'

const router = express.Router();

// params
router.param('leccionId', leccionById);

// routes

/**
 * @swagger
 * /api/v1/leccion:
 *   get:
 *     tags:
 *       - Leccion
 *     description: Retorna todas las lecciones
 *     produces:
 *       - application/json
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un arreglo de lecciones
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
 *                     $ref: '#/definitions/Leccion'
 */
router.get(leccion, isAuth, listar);


/**
 * @swagger
 * /api/v1/leccion/{id}:
 *   get:
 *     tags:
 *       - Leccion
 *     description: Retorna una leccion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Leccion
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un objeto de la leccion encontrada
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Leccion'
 */
router.get(leccion + '/:leccionId', isAuth, getId);


/**
 * @swagger
 * /api/v1/leccion:
 *   post:
 *     tags:
 *       - Leccion
 *     description: Agrega una leccion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Leccion
 *         description: Objeto de leccion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Leccion_Body'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Leccion ingresada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Leccion'
 */
router.post(leccion, [isAuth, isAdmin], guardar);


/**
 * @swagger
 * /api/v1/leccion/{id}:
 *   put:
 *     tags: 
 *       - Leccion
 *     description: Actualiza una leccion
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Leccion
 *         in: path
 *         required: true
 *         type: string
 *       - name: Leccion
 *         in: body
 *         description: Datos para actualizar la leccion
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Leccion'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Leccion actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Leccion'
 */
router.put(leccion + '/:leccionId', [isAuth, isAdmin], actualizar);


/**
 * @swagger
 * /api/v1/leccion/{id}:
 *   delete:
 *     tags:
 *       - Leccion
 *     description: Elimina una leccion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Leccion
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Leccion eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Leccion'
 */
router.delete(leccion + '/:leccionId', [isAuth, isAdmin], borrar);

module.exports = router;