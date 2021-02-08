const ModelCategoria = require('../../models/model_categoria');

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
// param id usuario
// ================================

const categoriaById = (req, res, next, id) => {

    ModelCategoria.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docCategoria = item
            next()

        })

}


// ================================
// Lista de Usuarios
// ================================

const listar = (req, res, next) => {

    ModelCategoria.find().where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items
        })

    })

}


// ================================
// Obtener Usuario
// ================================

const getId = (req, res, next) => {

    res.json({
        result: true,
        data: req.docCategoria
    })

}


// ================================
// Registrar un Usuario
// ================================

const guardar = (req, res, next) => {

    let data = {
        nombre: req.body.nombre
    }

    let modelCategoria = new ModelCategoria(data)

    modelCategoria.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            result: true,
            data: item
        })

    });

}

// ================================
// Actualizar un Usuario
// ================================

const actualizar = (req, res, next) => {

    console.log(req.docCategoria);

    ModelCategoria.findByIdAndUpdate(req.docCategoria._id, req.body, { new: true }, (err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            result: true,
            data: item
        })

    })


}

// ================================
// Borrar un Usuario
// ================================

const borrar = (req, res, next) => {

    req.docCategoria.disponible = false
    req.docCategoria.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            result: true,
            data: item
        })

    })

}



module.exports = {
    categoriaById,
    getId,
    listar,
    guardar,
    actualizar,
    borrar
}