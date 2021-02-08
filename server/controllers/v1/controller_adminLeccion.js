const ModelUsuario = require('../../models/model_usuario');
const ModelLeccion = require('../../models/model_leccion');



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

const leccionById = (req, res, next, id) => {

    ModelLeccion.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docLeccion = item;
            next();

        })

}



// ================================
// param id curso
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
// Leccion completada
//=================

const completa = async(req, res, next) => {


    let usuarioModel = req.docUsuario;

    let usuario = await usuarioModel.leccionCompleta(req.docLeccion);

    if (usuario) {

        res.json({
            result: true,
            data: usuario
        });

    }

}


//=================
// Leccion no completada
//=================

const incompleta = async(req, res, next) => {


    let usuarioModel = req.docUsuario;

    let usuario = await usuarioModel.leccionIncompleta(req.docLeccion);

    if (usuario) {

        res.json({
            result: true,
            data: usuario
        });

    }

}


module.exports = {
    leccionById,
    usuarioById,
    completa,
    incompleta
}