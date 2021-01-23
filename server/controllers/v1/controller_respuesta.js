const ModelRespuesta = require('../../models/model_respuesta');
const ModelUsuario = require('../../models/model_usuario');

// funcion handler que captura los errores
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
// param id Respuesta
// ================================

const respuestaById = (req, res, next, id) => {

    ModelRespuesta.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docRespuesta = item
            next()

        })

}


// ================================
// Lista de Respuestas
// ================================

const listar = (req, res, next) => {

    ModelRespuesta.find().select('-imagen').where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items
        })

    })

}


// ================================
// Obtener Respuesta
// ================================

const getId = (req, res, next) => {

    res.json({
        ok: true,
        data: req.docRespuesta
    })

}


// ================================
// Registrar una Respuesta
// ================================

const guardar = async(req, res, next) => {

    let idUsuario = req.params.usuarioId;

    console.log(idUsuario);

    docUsuario = await ModelUsuario.findById(idUsuario).exec();
    console.log('docUsuario: ', docUsuario);

    if (!docUsuario) {
        let err = new Error('usuario no existe');
        next(err);
    }

    let data = {
        usuario: {
            nombre: docUsuario.nombre,
            apellido: docUsuario.apellido,
            email: docUsuario.email,
            usuarioId: docUsuario._id
        },
        preguntaId: req.body.preguntaId,
        descripcion: req.body.descripcion
    }

    console.log(req.files);

    let modelRespuesta = new ModelRespuesta(data);

    modelRespuesta.imagen.data = req.files.imagen.data;
    modelRespuesta.imagen.contentType = req.files.imagen.mimetype;

    if (req.files) {

        if (req.files.imagen.size > 1000000) {
            let err = new Error('Supera el tamaño máximo permitido');
            err.statusCode = 413;
            return next(err);
        }

    }

    modelRespuesta.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        item = item.toObject();
        delete item.imagen;

        res.json({
            result: true,
            data: item
        })

    })

}

// ================================
// Actualizar una Respuesta
// ================================

const actualizar = (req, res, next) => {

    console.log(req.docRespuesta);

    ModelRespuesta.findByIdAndUpdate(req.docRespuesta._id, req.body, { new: true }, (err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            result: true,
            data: item
        })

    })


}

// ================================
// Borrar una Respuesta
// ================================

const borrar = (req, res, next) => {

    req.docRespuesta.disponible = false
    req.docRespuesta.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            ok: true,
            data: item
        })

    })

}


module.exports = {
    respuestaById,
    getId,
    listar,
    guardar,
    actualizar,
    borrar
}