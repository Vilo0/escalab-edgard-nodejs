const loginRouter = require('./router_login');
const usuarioRouter = require('./router_usuario');
const categoriaRouter = require('./router_categoria');
const cursoRouter = require('./router_curso');
const leccionRouter = require('./router_leccion');
const preguntaRouter = require('./router_pregunta');
const respuestaRouter = require('./router_respuesta');
const adminCursoRouter = require('./router_adminCurso');

const v1_api = '/api/v1';


module.exports = (app) => {

    app.use(v1_api, loginRouter);
    app.use(v1_api, usuarioRouter);
    app.use(v1_api, categoriaRouter);
    app.use(v1_api, cursoRouter);
    app.use(v1_api, leccionRouter);
    app.use(v1_api, preguntaRouter);
    app.use(v1_api, respuestaRouter);
    app.use(v1_api, adminCursoRouter);

}