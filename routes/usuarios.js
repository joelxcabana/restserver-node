
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation')
const { esRolValido,emailExiste,existeUserById} = require('../helpers/db-validators')
const {validarjwt} = require('../middlewares/validad-jwt')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
  check('id','no es un id valido').isMongoId(),
  check('id').custom(existeUserById),
  validarCampos
] ,usuariosPut );

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('password','password is required').not().isEmpty(),
    check('password','password is min 6 characters').isLength({min:6}),
    check('email','email is not valid').isEmail(),
    check('email').custom(emailExiste),
    //check('rol','rol is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
    ],
    usuariosPost );

router.delete('/:id', 
[
  validarjwt,
 // esAdminRole,
  tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id','no es un id valido').isMongoId(),
  check('id').custom(existeUserById),
  validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;