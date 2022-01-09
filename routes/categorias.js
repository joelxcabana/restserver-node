const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,obtenerCategorias,obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const {esAdminRole} = require('../middlewares/validar-roles')
const {validarjwt, validarCampos} = require('../middlewares')

const router = Router();

//obtener todas las categorias - publico
router.get('/',obtenerCategorias)

//obtener una categoria por id -publico
router.get('/:id',
[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
]
,obtenerCategoria)

//crear una nueva categoria - privado (cualquir rol)
router.post('/',[
    validarjwt,
    check('name','el nombre es requerido').not().isEmpty(),
    validarCampos
],crearCategoria)

//actualizar una categoria - privado (cualquier rol)
router.put('/:id',[
    validarjwt,
    check('name','el nombre es requerido').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],
actualizarCategoria)


//borar una categoria - privado  - si es admin
router.delete('/:id',
[
    validarjwt,
    esAdminRole,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],
borrarCategoria)









module.exports = router;