const express = require('express');

const { usuarioById, cursoById, agregar, borrar, activar, desactivar } = require('../../controllers/v1/controller_adminCurso');

const { isAdmin, isAuth } = require('../../middlewares/auth');


/**
 * @swagger
 * definitions:
 *   Curso_Activo:
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
 *   Curso_Inactivo:
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
 *                 disponible:
 *                   default: false
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
 *   Sin_Curso:
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
router.param('cursoId', cursoById);

// routes

/**
 * @swagger
 * /api/v1/usuario/{idUsuario}/curso/{idCurso}/agregar:
 *   get:
 *     tags:
 *       - Administrar Cursos a Usuarios
 *     description: Agregar un curso a un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idUsuario
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *       - name: idCurso
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario con sus cursos asociados
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Curso_Activo'
 */
router.get('/usuario/:usuarioId/curso/:cursoId/agregar', [isAuth, isAdmin], agregar);


/**
 * @swagger
 * /api/v1/usuario/{idUsuario}/curso/{idCurso}/borrar:
 *   get:
 *     tags:
 *       - Administrar Cursos a Usuarios
 *     description: Elimina un curso a un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idUsuario
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *       - name: idCurso
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario con sus cursos asociados (si es que aún le quedan)
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Sin_Curso'
 */
router.get('/usuario/:usuarioId/curso/:cursoId/borrar', [isAuth, isAdmin], borrar);


/**
 * @swagger
 * /api/v1/usuario/{idUsuario}/curso/{idCurso}/activar:
 *   get:
 *     tags:
 *       - Administrar Cursos a Usuarios
 *     description: Activa un curso a un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idUsuario
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *       - name: idCurso
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario con sus cursos asociados (Activos e Inactivos)
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Curso_Activo'
 */
router.get('/usuario/:usuarioId/curso/:cursoId/activar', [isAuth, isAdmin], activar);


/**
 * @swagger
 * /api/v1/usuario/{idUsuario}/curso/{idCurso}/desactivar:
 *   get:
 *     tags:
 *       - Administrar Cursos a Usuarios
 *     description: Desactiva un curso a un usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idUsuario
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *       - name: idCurso
 *         description:
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Usuario con sus cursos asociados (Activos e Inactivos)
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/Curso_Inacctivo'
 */
router.get('/usuario/:usuarioId/curso/:cursoId/desactivar', [isAuth, isAdmin], desactivar);

module.exports = router;