
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('password','password is required').not().isEmpty(),
    check('password','password is min 6 characters').isLength({min:6}),
    check('email','email is not valid').isEmail(),
    check('rol','rol is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
    ],
    usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;