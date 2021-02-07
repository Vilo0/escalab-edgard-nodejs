const ModelLeccion = require('../../models/model_leccion');
const ModelCurso = require('../../models/model_curso');

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
// param id Leccion
// ================================

const leccionById = (req, res, next, id) => {

    ModelLeccion.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item);

            req.docLeccion = item;
            next();

        })

}


// ================================
// param id Curso
// ================================

const cursoById = (req, res, next, id) => {

    ModelCurso.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item);

            req.docCurso = item;
            next();

        })

}



// ================================
// Lista de Lecciones
// ================================

const listar = (req, res, next) => {

    // ModelLeccion.find().select('-documento').where({ disponible: true }).exec((err, items)
    ModelLeccion.find().populate('cursoId').where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items
        })

    })

}


// ================================
// Obtener Leccion
// ================================

const getId = (req, res, next) => {

    res.json({
        ok: true,
        data: req.docLeccion
    })

}


// ================================
// Lecciones por Curso
// ================================

const listaxCurso = (req, res, next) => {

    // ModelLeccion.find().select('-documento').where({ disponible: true }).exec((err, items)
    ModelLeccion.find({ cursoId: req.docCurso._id }).where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items,
            curso: req.docCurso
        })

    })

}


// ================================
// Registrar una Leccion
// ================================

const guardar = async(req, res, next) => {

    let idCurso = req.body.cursoId;

    let data = {
        cursoId: req.body.cursoId,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }

    let modelLeccion = new ModelLeccion(data);

    // Subir archivo
    const documento = {
        data: req.body.documento
    };

    await cloudinary.uploader.upload(documento.data, { tags: 'leccion' }, function(err, image) {
        console.log(image);
        modelLeccion.documento = image.url;
        if (err) { console.warn(err); }
    });

    modelLeccion.save(async(err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        docCurso = await ModelCurso.findById(idCurso).exec();
        await docCurso.addLeccion(item);

        res.json({
            result: true,
            data: item
        })

    })

}

// ================================
// Actualizar una Leccion
// ================================

const actualizar = (req, res, next) => {

    console.log(req.docLeccion);

    ModelLeccion.findByIdAndUpdate(req.docLeccion._id, req.body, { new: true }, (err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        res.json({
            result: true,
            data: item
        });

    })


}

// ================================
// Borrar una Leccion
// ================================

const borrar = (req, res, next) => {

    req.docLeccion.disponible = false
    req.docLeccion.save(async(err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        docCurso = await ModelCurso.findById(req.docLeccion.cursoId).exec();
        await docCurso.deleteLeccion(item);

        res.json({
            ok: true,
            data: item
        })

    })

}



module.exports = {
    leccionById,
    cursoById,
    getId,
    listar,
    listaxCurso,
    guardar,
    actualizar,
    borrar
}