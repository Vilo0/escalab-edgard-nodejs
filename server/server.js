// paquetes de terceros
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const bcrypt = require('bcrypt');

console.log(`${ __dirname }`);

require('dotenv').config();

const MONGO_URL = process.env.URL_MONGO;

console.log(MONGO_URL);

const routersV1 = require('./routers/v1');

// Express //
const app = express();


// Habilitar body en el express
app.use(bodyParser.json());

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