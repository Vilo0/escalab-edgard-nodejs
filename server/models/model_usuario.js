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
            lecciones_totales: {
                type: Number,
                required: true
            },
            porcentaje_avance: {
                type: Number,
                required: true
            },
            lecciones: {
                items: [{
                    leccionId: {
                        type: Schema.Types.ObjectId,
                        ref: 'ModelLeccion'
                    }
                }]
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
        console.log('curso: ', curso);

        return item.cursoId.toString() === curso._id.toString()

    });

    misCursos = [...this.cursos.items];

    if (index < 0) {

        misCursos.push({
            cursoId: curso._id,
            fecha_expiracion: fecha,
            lecciones_completadas: 0,
            lecciones_totales: curso.lecciones.items.length,
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


ModelUsuario.methods.leccionCompleta = function(leccion) {

    let misLecciones = [];

    let indexCurso = this.cursos.items.findIndex(item => {

        console.log(item);

        return item.cursoId.toString() === leccion.cursoId.toString()
    });

    let index = this.cursos.items[indexCurso].lecciones.items.findIndex(item => {

        //console.log('item: ', item.leccionId);
        console.log('leccion: ', leccion);

        return item.leccionId.toString() === leccion._id.toString()

    });

    misLecciones = [...this.cursos.items[indexCurso].lecciones.items];

    if (index < 0) {

        misLecciones.push({
            leccionId: leccion._id
        })

    }

    let nuevasLecciones = {
        items: misLecciones
    }

    this.cursos.items[indexCurso].lecciones = nuevasLecciones;

    console.log('Lecciones completadas: ', this.cursos.items[indexCurso].lecciones.items.length);
    console.log('lecciones totales', this.cursos.items[indexCurso].lecciones_totales);

    this.cursos.items[indexCurso].porcentaje_avance = Math.floor(this.cursos.items[indexCurso].lecciones.items.length / this.cursos.items[indexCurso].lecciones_totales * 100);

    console.log('porcentaje de avance: ', this.cursos.items[indexCurso].porcentaje_avance);

    return this.save();

}

ModelUsuario.methods.leccionIncompleta = function(leccion) {

    let misLecciones = [];

    let indexCurso = this.cursos.items.findIndex(item => {

        console.log(item);

        return item.cursoId.toString() === leccion.cursoId.toString()
    });

    let index = this.cursos.items[indexCurso].lecciones.items.findIndex(item => {

        //console.log('item: ', item.leccionId);
        console.log('leccion: ', leccion);

        return item.leccionId.toString() === leccion._id.toString()

    });

    misLecciones = [...this.cursos.items[indexCurso].lecciones.items];

    if (index >= 0) {

        delete misLecciones[index];
        //misCursos.splice(index, index);

    }

    let nuevasLecciones = {
        items: misLecciones
    }

    this.cursos.items[indexCurso].lecciones = nuevasLecciones;

    console.log('Lecciones completadas: ', this.cursos.items[indexCurso].lecciones.items.length);
    console.log('lecciones totales', this.cursos.items[indexCurso].lecciones_totales);

    this.cursos.items[indexCurso].porcentaje_avance = Math.floor(this.cursos.items[indexCurso].lecciones.items.length / this.cursos.items[indexCurso].lecciones_totales * 100);

    console.log('porcentaje de avance: ', this.cursos.items[indexCurso].porcentaje_avance);

    return this.save();

}

const model = mongoose.model('ModelUsuario', ModelUsuario);

module.exports = model;