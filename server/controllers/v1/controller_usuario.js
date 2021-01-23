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
// param id usuario
// ================================

const usuarioById = (req, res, next, id) => {

    ModelUsuario.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item)

            req.docUsuario = item
            next()

        })

}


// ================================
// Lista de Usuarios
// ================================

const listar = (req, res, next) => {

    ModelUsuario.find().where({ disponible: true }).exec((err, items) => {

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
        ok: true,
        data: req.docUsuario
    })

}


// ================================
// Registrar un Usuario
// ================================

const guardar = (req, res, next) => {

    let data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password
    }

    let modelUsuario = new ModelUsuario(data)

    modelUsuario.save((err, item) => {

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

    console.log(req.docUsuario);

    ModelUsuario.findByIdAndUpdate(req.docUsuario._id, req.body, { new: true }, (err, item) => {

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

    req.docUsuario.disponible = false
    req.docUsuario.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item)

        res.json({
            ok: true,
            data: item
        })

    })

}



module.exports = {
    usuarioById,
    getId,
    listar,
    guardar,
    actualizar,
    borrar
}