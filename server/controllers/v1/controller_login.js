const ModelUsuario = require('../../models/model_usuario')


const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


function errorHandler(err, next, item) {
    // handle error
    if (err) {
        return next(err);
    }
    if (!item) {
        const error = new Error('usuario o (password) incorrecto');
        error.statusCode = 500;
        return next(error);
    }
}

//===========
// Login
//==========
const login = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;

    ModelUsuario.findOne({ email: email }, (err, item) => {

        if (err || !item)
            return errorHandler(err, next, item);

        if (!bcrypt.compareSync(password, item.password)) {
            return res.status(401).json({
                result: true,
                message: "usuario o (password) incorrecto"
            });
        }

        let payload = {
            usuarioId: item._id,
            role: item.role
        }

        let token = jwt.sign(payload, process.env.SEED, { expiresIn: '7d' });

        let user = item.toObject();
        delete user.password;

        res.json({
            result: true,
            data: {
                usuarioId: item._id,
                role: item.role,
                nombre: item.nombre,
                token: token
            }
        });

    });

}

//=================
// signup
//================

const signup = (req, res, next) => {

    let data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: bcrypt.hashSync(req.body.password, Number(process.env.SALTH)),
        role: 'USER_ROLE'
    }

    let modelUsuario = new ModelUsuario(data);

    modelUsuario.save((err, item) => {
        if (err || !item) return errorHandler(err, next, item);

        item = item.toObject();
        delete item.password;

        res.json({
            result: true,
            data: item
        })
    })

}


const logout = (req, res) => {
    // if (req.session) {
    //     req.session.destroy(item => {
    res.json({
            result: true
        })
        //     })
        // }
}

module.exports = {
    login,
    logout,
    signup
}