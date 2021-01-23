const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let modelLeccion = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    documento: {
        data: Buffer,
        contentType: String
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
})

const model = mongoose.model('ModelLeccion', modelLeccion)

module.exports = model