const express = require('express');

const { cursoById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_curso');

const { isAdmin, isAuth } = require('../../middlewares/auth');

/** 
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         imagen:
 *           type: string
 *         categorias:
 *           type: array
 *           items: 
 *             type: string
 *         lecciones:
 *           type: array
 *           items:
 *             type: object
 */

/**
 * @swagger
 * definitions:
 *   Curso:
 *     type: object
 *     properties:
 *       disponible:
 *         default: true
 *       _id:
 *         default: 600c6ecf74dd6279c434e569
 *       nombre:
 *         default: Curso actualizado de HTML
 *       descripcion:
 *         default: Html, css, y javascript 2.0
 *       imagen:
 *         default: https://urlImagen.jpg
 *       nombre_categoria:
 *         default: Desarrollo Web
 *       lecciones:
 *         default: [ 600c6ecf74dd6279c434e560 ]
 */


/**
 * @swagger
 * definitions:
 *   Curso_Body:
 *     type: object
 *     properties:
 *       nombre:
 *         default: Curso actualizado de HTML
 *       descripcion:
 *         default: Html, css, y javascript 2.0
 *       imagen:
 *         default: https://urlImagen.jpg
 *       nombre_categoria:
 *         default: Desarrollo Web
 *       lecciones:
 *         default: [ 600c6ecf74dd6279c434e560 ]
 */
const curso = '/curso';

const router = express.Router();

// params
router.param('cursoId', cursoById);

// routes

/**
 * @swagger
 * /api/v1/curso:
 *   get:
 *     tags:
 *       - Curso
 *     description: Retorna todos los cursos
 *     produces:
 *       - application/json
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un arreglo de cursos
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
 *                     $ref: '#/definitions/Curso'
 */
router.get(curso, isAuth, listar);


/**
 * @swagger
 * /api/v1/curso/{id}:
 *   get:
 *     tags:
 *       - Curso
 *     description: Retorna un curso
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Curso
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un objeto del curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Curso'
 */
router.get(curso + '/:cursoId', isAuth, getId);


/**
 * @swagger
 * /api/v1/curso:
 *   post:
 *     tags:
 *       - Curso
 *     description: Agrega un curso
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Curso
 *         description: Objeto de curso
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Curso_Body'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Curso ingresado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Curso'
 */
router.post(curso, [isAuth, isAdmin], guardar);


/**
 * @swagger
 * /api/v1/curso/{id}:
 *   put:
 *     tags: 
 *       - Curso
 *     description: Actualiza un curso
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Curso
 *         in: path
 *         required: true
 *         type: string
 *       - name: Curso
 *         in: body
 *         description: Datos para actualizar el curso
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Curso'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Curso'
 */
router.put(curso + '/:cursoId', [isAuth, isAdmin], actualizar);


/**
 * @swagger
 * /api/v1/curso/{id}:
 *   delete:
 *     tags:
 *       - Curso
 *     description: Elimina un curso
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Curso
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Curso eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Curso'
 */
router.delete(curso + '/:cursoId', [isAuth, isAdmin], borrar);

module.exports = router;