const ModelLeccion = require('../../models/model_leccion');
const ModelCurso = require('../../models/model_curso');

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
// Lista de Lecciones
// ================================

const listar = (req, res, next) => {

    ModelLeccion.find().select('-documento').where({ disponible: true }).exec((err, items) => {

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
// Registrar una Leccion
// ================================

const guardar = (req, res, next) => {

    let idCurso = req.body.cursoId;

    let data = {
        cursoId: req.body.cursoId,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }

    console.log(req.files);

    let modelLeccion = new ModelLeccion(data);

    modelLeccion.documento.data = req.files.documento.data;
    modelLeccion.documento.contentType = req.files.documento.mimetype;

    if (req.files) {

        if (req.files.documento.size > 1000000) {
            let err = new Error('Supera el tamaño máximo permitido');
            err.statusCode = 413;
            return next(err);
        }

    }

    modelLeccion.save(async(err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        item = item.toObject();
        delete item.documento;

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
    getId,
    listar,
    guardar,
    actualizar,
    borrar
}