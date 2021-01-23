const express = require('express');

const { cursoById, getId, listar, guardar, actualizar, borrar } = require('../../controllers/v1/controller_curso');

const { isAdmin, isAuth } = require('../../middlewares/auth');

const curso = '/curso';

const router = express.Router();

// params
router.param('cursoId', cursoById);

// routes
router.get(curso + '/:cursoId', isAuth, getId);
router.get(curso, isAuth, listar);
router.post(curso, [isAuth, isAdmin], guardar);
router.put(curso + '/:cursoId', [isAuth, isAdmin], actualizar);
router.delete(curso + '/:cursoId', [isAuth, isAdmin], borrar);

module.exports = router;