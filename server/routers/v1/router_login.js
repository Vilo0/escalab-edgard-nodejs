//modulo terceros
const express = require('express');


//modulo local
const { login, logout, signup } = require('../../controllers/v1/controller_login');
const { validateSignup } = require('../../validators/vLogin');

const router = express.Router();


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Login
 *     description: Ingresar login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Login
 *         description: Datos de Login
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *             default: edgard@mail.com
 *           password:
 *             type: string
 *             default: pass123
 *     responses:
 *       200:
 *         description: Login realizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     usuarioId: 
 *                       default: "600a1852776f5a5ad01c76fb"
 *                     role:
 *                       default: USER_ROLE
 *                     token:
 *                       default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOiI2MDBhMTg1Mjc3NmY1YTVhZDAxYzc2ZmIiLCJyb2xlIjoiQURNSU5fUk9MRSIsImlhdCI6MTYxMTYxNjI3MiwiZXhwIjoxNjEyMjIxMDcyfQ.ENCLf_WqSnwpqXsSENDfhHQDfueBa1WRoq6DKTk3JdI
 */
router.post('/login', login);


/**
 * @swagger
 * /api/v1/registro:
 *   post:
 *     tags:
 *       - Registro
 *     description: Registro de usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Registro
 *         description: Datos de usuario para registro
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           nombre:
 *             type: string
 *             default: Escalab
 *           apellido:
 *             type: string
 *             default: Nodejs
 *           email:
 *             type: string
 *             default: escalab@mail.com
 *           telefono:
 *             type: string
 *             default: 555 555
 *           password:
 *             type: string
 *             default: pass123
 *     responses:
 *       200:
 *         description: Login realizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 result:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     cursos:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                           default: []
 *                     role:
 *                       default: USER_ROLE
 *                     disponible:
 *                       default: true
 *                     _id:
 *                       default: 602319778b0a8869a8a1a998
 *                     nombre:
 *                       default: Otro
 *                     apellido:
 *                       default: Vilo2.0
 *                     email:
 *                       default: escalab2026@mail.com
 *                     telefono:
 *                       default: 5555 5555
 *                     createdAt:
 *                       default: 2021-02-09T23:36:39.697Z
 *                     updatedAt:
 *                       default: 2021-02-09T23:36:39.697Z
 *                     __v:
 *                       default: 0
 */
router.post('/registro', signup);

module.exports = router;