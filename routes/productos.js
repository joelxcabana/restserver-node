const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto,obtenerProducto,obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const {esAdminRole} = require('../middlewares/validar-roles')
const {validarjwt, validarCampos} = require('../middlewares')

const router = Router();

//obtener todas las categorias - publico
router.get('/',obtenerProductos)

//obtener una categoria por id -publico
router.get('/:id',
[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos,
]
,obtenerProducto)

//crear una nueva categoria - privado (cualquir rol)
router.post('/',[
    validarjwt,
    check('name','el nombre es requerido').not().isEmpty(),
    check('category','no es un id de mongo').isMongoId(),
    check('category').custom(existeCategoria),
    validarCampos
],crearProducto)

//actualizar una categoria - privado (cualquier rol)
router.put('/:id',[
    validarjwt,
  //  check('category','no es un id de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],
actualizarProducto)


//borar una categoria - privado  - si es admin
router.delete('/:id',
[
    validarjwt,
    esAdminRole,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],
borrarProducto)

module.exports = router;