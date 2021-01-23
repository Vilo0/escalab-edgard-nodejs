const express = require('express');

const { usuarioById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_usuario');

const { isAdmin, isAuth } = require('../../middlewares/auth');

const usuario = '/usuario';

const router = express.Router();

// params
router.param('usuarioId', usuarioById);

// routes
router.get(usuario + '/:usuarioId', isAuth, getId);
router.get(usuario, [isAuth, isAdmin], listar);
router.post(usuario, [isAuth, isAdmin], guardar);
router.put(usuario + '/:usuarioId', isAuth, actualizar);
router.delete(usuario + '/:usuarioId', [isAuth, isAdmin], borrar);

module.exports = router;