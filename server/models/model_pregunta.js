const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let modelPregunta = new mongoose.Schema({
    usuario: {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        usuarioId: {
            type: Schema.Types.ObjectId,
            ref: 'ModelUsuario'
        }
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    cursoId: {
        type: Schema.Types.ObjectId,
        ref: 'ModelCurso',
    },
    disponible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const model = mongoose.model('ModelPregunta', modelPregunta);

module.exports = model;