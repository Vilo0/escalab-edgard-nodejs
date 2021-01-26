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
 *                 ok:
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
 * /api/v1/signup:
 *   post:
 *     tags:
 *       - Register
 *     description: Registro usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Registro de usuario
 *         description: Datos necesarios para el registro
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *            nombre:
 *              type: string
 *              default: Edgard
 *            apellido:
 *             type: string
 *             default: Vilo
 *            email:
 *              type: string
 *              default: escalab@mail.com
 *            password:
 *              type: string
 *              default: escabalNode
 *     responses:
 *       200:
 *         description: Login realizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     cursos: 
 *                       type: object
 *                       properties:
 *                         items:
 *                           default: []
 *                     role:
 *                       default: USER_ROLE
 *                     disponible:
 *                       default: true
 *                     _id: 
 *                       default: 600f7167f3200634f40d90d7
 *                     nombre:
 *                       default: Edgard
 *                     apellido:
 *                       default: Vilo
 *                     email:
 *                       default: escalab@mail.com
 */
router.post('/signup', validateSignup, signup);

module.exports = router;