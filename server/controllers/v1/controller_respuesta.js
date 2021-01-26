const ModelRespuesta = require('../../models/model_respuesta');
const ModelUsuario = require('../../models/model_usuario');

const { cloudinary } = require('../../utils/cloudinary');

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

    ModelRespuesta.find().where({ disponible: true }).exec((err, items) => {

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

    let modelRespuesta = new ModelRespuesta(data);

    // Subir archivo
    const imagen = {
        data: req.body.imagen,
    };

    await cloudinary.uploader.upload(imagen.data, { tags: 'respuesta' }, function(err, image) {
        console.log(image);
        modelRespuesta.imagen = image.url;
        if (err) { console.warn(err); }
    });


    modelRespuesta.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item);

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