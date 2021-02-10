// paquetes de terceros
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const ModelUsuario = require('./models/model_usuario');
const ModelCategoria = require('./models/model_categoria');
const bcrypt = require('bcrypt');

console.log(`${ __dirname }`);

if (process.env.NODE_ENV == 'development') {
    require('dotenv').config({ path: `${ __dirname }/../.env.development` })
} else {
    require('dotenv').config()
}

const MONGO_URL = process.env.URL_MONGO;

console.log(MONGO_URL);

const routersV1 = require('./routers/v1');

// Express //
const app = express();


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Cursos Online API',
            description: "Proyecto API para Escalab - Curso Escabalab Nodejs 2021",
            contact: {
                name: 'Edgard Vilo'
            }
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
        }
        // security: [{
        //     jwt: []
        // }],
    },
    apis: [`${ __dirname }/routers/v1/*.js`]
};

// final definitions with swagger-express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Habilitar body en el express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar la opción de archivos en el express
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    // abortOnLimit: true
}));

// Habilitar uso de cors
app.use(cors({
    credentials: true,
    origin: true
}))

routersV1(app);


// Handler manejo de errores //
app.use((error, req, res, next) => {

    const status = error.statusCode || 500
    const message = error.message
    const data = error.data

    res.json({
        result: false,
        message: message,
        data: data
    })

})

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {

    console.log('Mongo OK');

    ModelUsuario.findOne({ email: 'admin@test.com' }, (err, user) => {
        if (!user) {

            let data = {
                nombre: 'admin',
                apellido: 'admin',
                email: 'admin@test.com',
                telefono: '5555 5555',
                password: bcrypt.hashSync('escalabNode', 10),
                role: 'ADMIN_ROLE',
            }
            console.log('save............');
            new ModelUsuario(data).save();

        }
    });

    ModelUsuario.findOne({ email: 'user@test.com' }, (err, user) => {
        if (!user) {

            let data = {
                nombre: 'user',
                apellido: 'user',
                email: 'user@test.com',
                telefono: '5555 5555',
                password: bcrypt.hashSync('escalabNode', 10),
                role: 'User_ROLE',
            }
            console.log('save............');
            new ModelUsuario(data).save();

        }
    });

    let ids = ['Desarrollo Web', 'Marketing Digital'];
    ModelCategoria.find({ 'nombre': { $in: ids } })
        .exec((err, items) => {
            console.log(err);
            console.log(items);
            if (items.length == 0) {
                new ModelCategoria({ nombre: "Desarrollo Web" }).save()
                new ModelCategoria({ nombre: "Marketing Digital" }).save()
            }
        });

}).catch((err) => {
    console.log(err);
});

app.listen((process.env.PORT), () => {
    console.log("Server Ok")
});