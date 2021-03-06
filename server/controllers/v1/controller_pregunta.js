const ModelPregunta = require('../../models/model_pregunta');
const ModelUsuario = require('../../models/model_usuario');
const ModelLeccion = require('../../models/model_leccion');
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
// param id Pregunta
// ================================

const preguntaById = (req, res, next, id) => {

    ModelPregunta.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docPregunta = item;
            next();

        })

}


// ================================
// param id Leccion
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
// Lista de Preguntas
// ================================

const listar = (req, res, next) => {

    ModelPregunta.find().populate('leccionId').where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items
        })

    })

}


// ================================
// Obtener Pregunta
// ================================

const getId = (req, res, next) => {

    res.json({
        result: true,
        data: req.docPregunta
    })

}


// ================================
// Lista de Preguntas por Leccion
// ================================

const listaxLeccion = (req, res, next) => {

    ModelPregunta.where({ leccionId: req.docLeccion._id }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items,
            leccion: req.docLeccion
        })

    })

}


// ================================
// Registrar una Pregunta
// ================================

const guardar = async(req, res, next) => {

    let idUsuario = req.params.usuarioId;

    docUsuario = await ModelUsuario.findById(idUsuario).exec();

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
        leccionId: req.body.leccionId,
        descripcion: req.body.descripcion
    }

    let modelPregunta = new ModelPregunta(data);

    // Subir archivo
    const imagen = {
        data: req.body.imagen,
    };

    if (imagen.data) {

        await cloudinary.uploader.upload(imagen.data, { tags: 'pregunta' }, function(err, image) {
            console.log(image);
            modelPregunta.imagen = image.url;
            if (err) { console.warn(err); }
        });

    } else {

        let dataBuffer = new Buffer.from(req.files.imagen.data);
        const imagen = imageDataURI.encode(dataBuffer, req.files.imagen.mimetype);

        await cloudinary.uploader.upload(imagen, { tags: 'curso' }, function(err, image) {
            modelPregunta.imagen = image.url;
            if (err) { console.warn(err); }
        });

    }

    modelPregunta.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        res.json({
            result: true,
            data: item
        })

    })

}

// ================================
// Actualizar una Pregunta
// ================================

const actualizar = (req, res, next) => {

    console.log(req.docPregunta);

    ModelPregunta.findByIdAndUpdate(req.docPregunta._id, req.body, { new: true }, (err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            result: true,
            data: item
        })

    })


}

// ================================
// Borrar una Pregunta
// ================================

const borrar = (req, res, next) => {

    req.docPregunta.disponible = false
    req.docPregunta.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            result: true,
            data: item
        })

    })

}



module.exports = {
    preguntaById,
    leccionById,
    getId,
    listar,
    listaxLeccion,
    guardar,
    actualizar,
    borrar
}