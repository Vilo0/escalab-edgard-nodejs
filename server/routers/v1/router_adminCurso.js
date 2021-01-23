const express = require('express');

const { usuarioById, cursoById, agregar, borrar, activar, desactivar } = require('../../controllers/v1/controller_adminCurso');

const { isAdmin, isAuth } = require('../../middlewares/auth');


const router = express.Router();

// params
router.param('usuarioId', usuarioById);
router.param('cursoId', cursoById);

// routes
router.get('/usuario/:usuarioId/curso/:cursoId/agregar', [isAuth, isAdmin], agregar);
router.get('/usuario/:usuarioId/curso/:cursoId/borrar', [isAuth, isAdmin], borrar);
router.get('/usuario/:usuarioId/curso/:cursoId/activar', [isAuth, isAdmin], activar);
router.get('/usuario/:usuarioId/curso/:cursoId/desactivar', [isAuth, isAdmin], desactivar);

module.exports = router;