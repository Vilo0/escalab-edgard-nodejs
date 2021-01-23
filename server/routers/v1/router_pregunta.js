const express = require('express');

const { preguntaById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_pregunta');

const { isAuth, isAdmin } = require('../../middlewares/auth');

const pregunta = '/pregunta';

const router = express.Router();

// params
router.param('preguntaId', preguntaById);

// routes
router.get(pregunta + '/:preguntaId', isAuth, getId);
router.get(pregunta, isAuth, listar);
router.post(pregunta + '/usuario/:usuarioId', isAuth, guardar);
router.put(pregunta + '/:preguntaId', isAuth, actualizar);
router.delete(pregunta + '/:preguntaId', isAuth, borrar);

module.exports = router;