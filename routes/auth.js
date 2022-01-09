const { Router } = require('express');
const { check } = require('express-validator');
const {login,googleSignIn} = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validation')

const router = Router();

router.post('/login',
[
    check('email','el correo es obligatorio').isEmail(),
    check('password','el password es obligatorio').not().isEmpty(),
    validarCampos
] ,login);

router.post('/google',
[
    check('id_token','el id_token es obligatorio').not().isEmpty(),
    validarCampos
] ,googleSignIn);

module.exports = router;