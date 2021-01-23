const ModelUsuario = require('../../models/model_usuario');
const ModelCurso = require('../../models/model_curso');



function errorHandler(err, next, item) {
    // handle error
    if (err) {
        return next(err)
    }
    if (!item) {
        const error = new Error('No existe')
        error.statusCode = 500
        return next(error)
    }
}


// ================================
// param id curso
// ================================

const cursoById = (req, res, next, id) => {

    ModelCurso.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docCurso = item;
            next();

        })

}


// ================================
// param id usuario
// ================================

const usuarioById = (req, res, next, id) => {

    ModelUsuario.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docUsuario = item;
            next();

        })

}


//=================
// Agregar Curso
//=================

const agregar = async(req, res, next) => {


    let usuarioModel = req.docUsuario;

    let nuevoCurso = await usuarioModel.addCurso(req.docCurso, Date.now());

    if (nuevoCurso) {

        res.json({
            ok: true,
            data: nuevoCurso
        });

    }

}


//=================
// Borrar Curso
//=================

const borrar = async(req, res, next) => {


    let usuarioModel = req.docUsuario;

    let nuevoCurso = await usuarioModel.deleteCurso(req.docCurso, Date.now());

    if (nuevoCurso) {

        res.json({
            ok: true,
            data: nuevoCurso
        });

    }

}


//=================
// Activar Curso
//=================

const activar = async(req, res, next) => {


    let usuarioModel = req.docUsuario;

    let nuevoCurso = await usuarioModel.activarCurso(req.docCurso);

    if (nuevoCurso) {

        res.json({
            ok: true,
            data: nuevoCurso
        });

    }

}


//=================
// Desactivar Curso
//=================
const desactivar = async(req, res, next) => {


    let usuarioModel = req.docUsuario;

    let nuevoCurso = await usuarioModel.desactivarCurso(req.docCurso);

    if (nuevoCurso) {

        res.json({
            ok: true,
            data: nuevoCurso
        });

    }

}


module.exports = {
    usuarioById,
    cursoById,
    agregar,
    borrar,
    activar,
    desactivar
}