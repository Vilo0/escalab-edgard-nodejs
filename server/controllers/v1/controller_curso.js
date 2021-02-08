const ModelCurso = require('../../models/model_curso');
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

    ModelCurso.where({ disponible: true }).exec((err, items) => {

        if (err || !items) return errorHandler(err, next, items)

        res.json({
            result: true,
            data: items
        })

    })

}


// ================================
// Cursos por Categoria
// ================================
const listaxCategoria = (req, res, next) => {

    console.log('params: ' + req.params.categoria);

    ModelCurso.find({ nombre_categoria: req.params.categoria })
        .where({ disponible: true })
        .exec((err, items) => {

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
        result: true,
        data: req.docCurso
    })

}


// ================================
// Registrar un Curso
// ================================

const guardar = async(req, res, next) => {

    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        nombre_categoria: req.body.nombre_categoria
    }

    let modelCurso = new ModelCurso(data);

    //console.log('imagen node: ', req.files.imagen);
    // Subir archivo
    const imagen = {
        data: req.body.imagen,
    };

    await cloudinary.uploader.upload(imagen.data, { tags: 'curso' }, function(err, image) {
        console.log(image);
        modelCurso.imagen = image.url;
        if (err) { console.warn(err); }
    });

    modelCurso.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        // item = item.toObject();
        // delete item.imagen;

        res.json({
            result: true,
            data: item
        })

    });

    // await cloudinary.uploader.upload(imagen.data).then((result) => {

    //     console.log(result);
    //     modelCurso.imagen = result.url;

    // }).catch((error) => {
    //     return next(error);
    // });

    // if (req.files) {

    //     if (req.files.imagen.size > 1000000) {
    //         let err = new Error('Supera el tamaño máximo permitido');
    //         err.statusCode = 413;
    //         return next(err);
    //     }

    // }

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
            result: true,
            data: item
        })

    })

}



module.exports = {
    cursoById,
    getId,
    listaxCategoria,
    listar,
    guardar,
    actualizar,
    borrar
}