const { body, validationResult } = require('express-validator');
const ModelUsuario = require('../models/model_usuario');

const pSignup = [

    body("email")
    .isEmail()
    .withMessage("Ingrese un email válido")
    .custom((value) => {
        console.log(value)
        return ModelUsuario.findOne({ email: value }).then(userDoc => {
            console.log(userDoc);
            if (userDoc) {
                return Promise.reject('Este correo ya existe: validator')
            }
        })
    }),

    body("nombre").trim()
    .not()
    .isEmpty(),

    body("password").trim()
    .isLength({ min: 5 })
    .withMessage('Mínimo de 5 caracteres')

]

const vSignup = (req, res, next) => {

    const errors = validationResult(req)
    console.log(errors)

    if (!errors.isEmpty()) {
        const error = new Error('Error validación')
        error.statusCode = 200
        error.data = errors.array()
        return next(error)
    }

    next();

}

const validateSignup = [pSignup, vSignup];

module.exports = {
    validateSignup
};