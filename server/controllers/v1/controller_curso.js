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
// param id curso
// ================================

const cursoById = (req, res, next, id) => {

    ModelCurso.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docCurso = item
            next()

        })

}


// ================================
// Lista de Cursos
// ================================

const listar = (req, res, next) => {

    ModelCurso.find().select('-imagen').where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items
        })

    })

}


// ================================
// Obtener Curso
// ================================

const getId = (req, res, next) => {

    res.json({
        ok: true,
        data: req.docCurso
    })

}


// ================================
// Registrar un Curso
// ================================

const guardar = (req, res, next) => {

    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        nombre_categoria: req.body.nombre_categoria
    }

    console.log(req.files);

    let modelCurso = new ModelCurso(data);

    modelCurso.imagen.data = req.files.imagen.data;
    modelCurso.imagen.contentType = req.files.imagen.mimetype;

    if (req.files) {

        if (req.files.imagen.size > 1000000) {
            let err = new Error('Supera el tamaño máximo permitido');
            err.statusCode = 413;
            return next(err);
        }

    }

    modelCurso.save((err, item) => {

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
// Actualizar un Curso
// ================================

const actualizar = (req, res, next) => {

    console.log(req.docCurso);

    ModelCurso.findByIdAndUpdate(req.docCurso._id, req.body, { new: true }, (err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            result: true,
            data: item
        })

    })


}

// ================================
// Borrar un Curso
// ================================

const borrar = (req, res, next) => {

    req.docCurso.disponible = false
    req.docCurso.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            ok: true,
            data: item
        })

    })

}



module.exports = {
    cursoById,
    getId,
    listar,
    guardar,
    actualizar,
    borrar
}