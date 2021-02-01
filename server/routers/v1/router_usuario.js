const express = require('express');

const { usuarioById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_usuario');

const { isAdmin, isAuth } = require('../../middlewares/auth');

/** 
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         email:
 *          type: string
 *         telefono: 
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         cursos: 
 *           type: array
 *           items:
 *              type: string
 *       example:
 *          nombre: Edgard
 *          apellido: Vilo
 *          email: demo@mail.com
 *          telefono: +569 44444555
 *          password: demo573
 *          role: USUARIO_ROLE
 *          cursos: [{ curso: "Html, Css y Javascript" }]
 */

/**
 * @swagger
 * definitions:
 *   Usuario:
 *     type: object
 *     properties:
 *       nombre:
 *         type: string
 *         example: "Edgard"
 *       apellido:
 *         type: string
 *         example: "Vilo"
 *       email:
 *         type: string
 *         example: "demo@mail.com"
 *       telefono:
 *         type: string
 *         example: "+569 2234 6666"
 */

const usuario = '/usuario';

const router = express.Router();


// params
router.param('usuarioId', usuarioById);

// routes
/**
 * @swagger
 * /api/v1/usuario:
 *   get:
 *     tags:
 *       - Usuario
 *     description: Retorna todos los usuarios
 *     produces:
 *       - application/json
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un arreglo de usuarios
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
 *                     $ref: '#/definitions/Usuario'
 */
router.get(usuario, [isAuth, isAdmin], listar);


/**
 * @swagger
 * /api/v1/usuario/{id}:
 *   get:
 *     tags:
 *       - Usuario
 *     description: Retorna un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Usuario
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Un objeto del usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Usuario'
 */
router.get(usuario + '/:usuarioId', isAuth, getId);


/**
 * @swagger
 * /api/v1/usuario:
 *   post:
 *     tags:
 *       - Usuario
 *     description: Agregar un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Usuario
 *         description: Objeto de usuario
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Usuario'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario ingresado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Usuario'
 */
router.post(usuario, [isAuth, isAdmin], guardar);


/**
 * @swagger
 * /api/v1/usuario/{id}:
 *   put:
 *     tags: 
 *       - Usuario
 *     description: Actualiza un usuario
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Usuario
 *         in: path
 *         required: true
 *         type: string
 *       - name: usuario
 *         in: body
 *         description: Datos para actualizar el usuario
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Usuario'
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Usuario'
 */
router.put(usuario + '/:usuarioId', isAuth, actualizar);

/**
 * @swagger
 * /api/v1/usuario/{id}:
 *   delete:
 *     tags:
 *       - Usuario
 *     description: Borra un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Usuario
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Usuario'
 */
router.delete(usuario + '/:usuarioId', [isAuth, isAdmin], borrar);

module.exports = router;