const mongoose = require('mongoose');
const ModelCategoria = require('./model_categoria');

const validator_categoria = async(val) => {

    let rpta = await ModelCategoria.exists({ nombre: val });

    return rpta;

}

let Schema = mongoose.Schema;

let modelCurso = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    nombre_categoria: {
        type: String,
        required: true,
    },
    lecciones: {
        items: [{
            leccionId: {
                type: Schema.Types.ObjectId
            }
        }]
    }
}, {
    timestamps: true
});


modelCurso.path('nombre_categoria').validate({
    validator: validator_categoria,
    message: 'Categoría de curso no existe: {VALUE}'
});


modelCurso.methods.addLeccion = function(leccion) {

    let misLecciones = [];

    let index = this.lecciones.items.findIndex(item => {

        console.log(item);
        console.log(leccion._id);

        return item.leccionId.toString() === leccion._id.toString()

    });

    misLecciones = [...this.lecciones.items];

    if (index < 0) {
        misLecciones.push({
            leccionId: leccion._id
        });
    }

    let nuevasLecciones = {
        items: misLecciones
    };

    this.lecciones = nuevasLecciones;

    return this.save();

}


// modelCurso.methods.updateLeccion = function(leccion) {

//     let misLecciones = [];

//     let index = this.lecciones.items.findIndex(item => {

//         console.log(item);
//         console.log(leccion._id);

//         return item.leccionId.toString() === leccion._id.toString()

//     });

//     misLecciones = [...this.lecciones.items];

//     if (index >= 0) {
//         misLecciones[index] = leccion;
//     }

//     let nuevasLecciones = {
//         items: misLecciones
//     }

//     this.lecciones = nuevasLecciones;

//     return this.save();

// }


modelCurso.methods.deleteLeccion = function(leccion) {

    let misLecciones = [];

    let index = this.lecciones.items.findIndex(item => {

        console.log(item);
        console.log(leccion._id);

        return item.leccionId.toString() === leccion._id.toString()

    });

    misLecciones = [...this.lecciones.items];

    if (index >= 0) {
        delete misLecciones[index];
    }

    let nuevasLecciones = {
        items: misLecciones
    }

    this.lecciones = nuevasLecciones;

    return this.save();

}


const model = mongoose.model('ModelCurso', modelCurso);

module.exports = model;