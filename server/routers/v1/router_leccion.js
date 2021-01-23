const express = require('express');

const { leccionById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_leccion');

const { isAuth, isAdmin } = require('../../middlewares/auth');

const leccion = '/leccion'

const router = express.Router();

// params
router.param('leccionId', leccionById);

// routes
router.get(leccion + '/:leccionId', getId);
router.get(leccion, listar);
router.post(leccion, [isAuth, isAdmin], guardar);
router.put(leccion + '/:leccionId', [isAuth, isAdmin], actualizar);
router.delete(leccion + '/:leccionId', [isAuth, isAdmin], borrar);

module.exports = router;