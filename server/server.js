// paquetes de terceros
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

console.log(`${ __dirname }`);

require('dotenv').config();

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
            },
            servers: ["http://localhost:3000", "https://escalab-edgard-vilo.herokuapp.com"]
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
        },
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

}).catch((err) => {
    console.log(err);
});

app.listen((process.env.PORT), () => {
    console.log("Server Ok")
})