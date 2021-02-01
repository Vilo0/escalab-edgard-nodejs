const express = require('express');

const { leccionById, usuarioById, completa, incompleta } = require('../../controllers/v1/controller_adminLeccion');

const { isAdmin, isAuth } = require('../../middlewares/auth');


/**
 * @swagger
 * definitions:
 *   Leccion_Completa:
 *     type: object
 *     properties:
 *       cursos:
 *         type: object
 *         properties:
 *           items:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 lecciones:
 *                   type: array
 *                   default: [{ _id: 600f7d74fe984d47582c164f, leccionId: 600f7d74fe984d47582c164Y  }]
 *                 disponible:
 *                   default: true
 *                 _id: 
 *                   default: 600f7d74fe984d47582c164f
 *                 cursoId:
 *                   default: 600d95aa85d76567dc379d4b
 *                 fecha_expiracion:
 *                   default: 2021-01-2
 *                 lecciones_completadas: 
 *                   default: 0
 *                 lecciones_totales:
 *                   default: 10
 *                 procentaje_avance:
 *                   default: 0
 *       role:
 *         default: "Edgard"
 *       apellido:
 *         default: "Vilo"
 *       email:
 *         default: "demo@mail.com"
 *       telefono:
 *         default: "+569 2234 6666"
 */

/**
 * @swagger
 * definitions:
 *   Leccion_Incompleta:
 *     type: object
 *     properties:
 *       cursos:
 *         type: object
 *         properties:
 *           items:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 lecciones:
 *                   type: array
 *                   default: []
 *                 disponible:
 *                   default: true
 *                 _id: 
 *                   default: 600f7d74fe984d47582c164f
 *                 cursoId:
 *                   default: 600d95aa85d76567dc379d4b
 *                 fecha_expiracion:
 *                   default: 2021-01-2
 *                 lecciones_completadas: 
 *                   default: 0
 *                 lecciones_totales:
 *                   default: 10
 *                 procentaje_avance:
 *                   default: 0
 *       role:
 *         default: "Edgard"
 *       apellido:
 *         default: "Vilo"
 *       email:
 *         default: "demo@mail.com"
 *       telefono:
 *         default: "+569 2234 6666"
 */

const router = express.Router();

// params
router.param('usuarioId', usuarioById);
router.param('leccionId', leccionById);

//routes

/**
 * @swagger
 * /api/v1/usuario/{idUsuario}/leccion/{idLeccion}/completa:
 *   get:
 *     tags:
 *       - Administrar lecciones a usuarios
 *     description: Completar una leccion de un curso a un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idUsuario
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *       - name: idLeccion
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario con sus cursos asociados y las lecciones completadas
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Leccion_Completa'
 */
router.get('/usuario/:usuarioId/leccion/:leccionId/completa', [isAuth, isAdmin], completa);


/**
 * @swagger
 * /api/v1/usuario/{idUsuario}/leccion/{idLeccion}/incompleta:
 *   get:
 *     tags:
 *       - Administrar lecciones a usuarios
 *     description: Leccion incompleta de un curso a un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idUsuario
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *       - name: idLeccion
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario con sus cursos asociados y las lecciones
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Leccion_Incompleta'
 */
router.get('/usuario/:usuarioId/leccion/:leccionId/incompleta', [isAuth, isAdmin], incompleta);

module.exports = router;