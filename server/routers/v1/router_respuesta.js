const express = require('express');

const { respuestaById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_respuesta');

const { isAuth, isAdmin } = require('../../middlewares/auth');

const respuesta = '/respuesta';

const router = express.Router();

// params
router.param('respuestaId', respuestaById);

// routes
router.get(respuesta + '/:respuestaId', isAuth, getId);
router.get(respuesta, isAuth, listar);
router.post(respuesta + '/usuario/:usuarioId', [isAuth, isAdmin], guardar);
router.put(respuesta + '/:respuestaId', [isAuth, isAdmin], actualizar);
router.delete(respuesta + '/:respuestaId', [isAuth, isAdmin], borrar);

module.exports = router;