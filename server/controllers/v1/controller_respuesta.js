const ModelRespuesta = require('../../models/model_respuesta');
const ModelPregunta = require('../../models/model_pregunta');
const ModelUsuario = require('../../models/model_usuario');
const { cloudinary } = require('../../utils/cloudinary');
const imageDataURI = require('image-data-uri');

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
// param id Pregunta
// ================================

const preguntaById = (req, res, next, id) => {

    ModelPregunta.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docPregunta = item
            next()

        })

}


// ================================
// Lista de Respuestas
// ================================

const listar = (req, res, next) => {

    ModelRespuesta.where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items
        })

    })

}


// ================================
// Lista de Respuestas por Pregunta
// ================================

const listaxPregunta = (req, res, next) => {

    ModelRespuesta.find({ preguntaId: req.docPregunta._id }).where({ disponible: true }).exec((err, items) => {

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
        result: true,
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

    if (imagen.data) {

        await cloudinary.uploader.upload(imagen.data, { tags: 'respuesta' }, function(err, image) {
            console.log(image);
            modelRespuesta.imagen = image.url;
            if (err) { console.warn(err); }
        });

    } else {

        let dataBuffer = new Buffer.from(req.files.imagen.data);
        const imagen = imageDataURI.encode(dataBuffer, req.files.imagen.mimetype);

        await cloudinary.uploader.upload(imagen, { tags: 'curso' }, function(err, image) {
            modelRespuesta.imagen = image.url;
            if (err) { console.warn(err); }
        });

    }

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
            result: true,
            data: item
        })

    })

}


module.exports = {
    respuestaById,
    preguntaById,
    getId,
    listar,
    listaxPregunta,
    guardar,
    actualizar,
    borrar
}