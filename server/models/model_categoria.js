const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const modelCategoria = new Schema({

    nombre: {
        type: String,
        required: true,
        unique: true
    },
    disponible: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const model = mongoose.model('ModelCategoria', modelCategoria);

module.exports = model;