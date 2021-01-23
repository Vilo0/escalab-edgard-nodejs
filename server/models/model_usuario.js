const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ModelUsuario = new Schema({

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
        required: true,
        unique: true
    },
    telefono: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    cursos: {
        items: [{
            cursoId: {
                type: Schema.Types.ObjectId,
                ref: 'ModelCurso'
            },
            disponible: {
                type: Boolean,
                default: true
            },
            fecha_expiracion: {
                type: Date,
                required: true
            },
            lecciones_completadas: {
                type: Number,
                required: true
            },
            lecciones_totales: {
                type: Number,
                required: true
            },
            porcentaje_avance: {
                type: Number,
                required: true
            }
        }]
    }
}, {
    timestamps: true
});


ModelUsuario.methods.addCurso = function(curso, fecha) {

    let misCursos = [];

    let index = this.cursos.items.findIndex(item => {

        console.log(item);
        console.log(curso._id);

        return item.cursoId.toString() === curso._id.toString()

    });

    misCursos = [...this.cursos.items];

    if (index < 0) {

        misCursos.push({
            cursoId: curso._id,
            fecha_expiracion: fecha,
            lecciones_completadas: 0,
            lecciones_totales: curso.lecciones.length,
            porcentaje_avance: 0
        })

    }

    let nuevosCursos = {
        items: misCursos
    }

    this.cursos = nuevosCursos;

    return this.save();

}


ModelUsuario.methods.deleteCurso = function(curso) {

    let misCursos = [];

    let index = this.cursos.items.findIndex(item => {

        console.log(item);
        console.log(curso._id);

        return item.cursoId.toString() === curso._id.toString()

    });

    misCursos = [...this.cursos.items];

    if (index >= 0) {

        delete misCursos[index];
        //misCursos.splice(index, index);

    }

    let nuevosCursos = {
        items: misCursos
    }

    this.cursos = nuevosCursos;

    return this.save();

}


ModelUsuario.methods.activarCurso = function(curso) {

    let index = this.cursos.items.findIndex(item => {

        console.log(item);
        console.log(curso._id);

        return item.cursoId.toString() === curso._id.toString()
    });

    let nuevosItems = [...this.cursos.items];

    if (index >= 0) {

        nuevosItems[index].disponible = true;

    }

    let nuevosCursos = {
        items: nuevosItems
    };

    this.cursos = nuevosCursos;
    return this.save();

}


ModelUsuario.methods.desactivarCurso = function(curso) {

    let index = this.cursos.items.findIndex(item => {

        console.log(item);
        console.log(curso._id);

        return item.cursoId.toString() === curso._id.toString()
    });

    let nuevosItems = [...this.cursos.items];

    if (index >= 0) {

        nuevosItems[index].disponible = false;

    }

    let nuevosCursos = {
        items: nuevosItems
    };

    this.cursos = nuevosCursos;
    return this.save();

}


const model = mongoose.model('ModelUsuario', ModelUsuario);

module.exports = model;