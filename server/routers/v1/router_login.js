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

module.exports = router;