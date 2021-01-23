const express = require('express');

const { categoriaById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_categoria');

const { isAdmin, isAuth } = require('../../middlewares/auth');

const categoria = '/categoria'

const router = express.Router();

// params
router.param('categoriaId', categoriaById);

// routes
router.get(categoria + '/:categoriaId', getId);
router.get(categoria, listar);
router.post(categoria, [isAuth, isAdmin], guardar);
router.put(categoria + '/:categoriaId', [isAuth, isAdmin], actualizar);
router.delete(categoria + '/:categoriaId', [isAuth, isAdmin], borrar);

module.exports = router;