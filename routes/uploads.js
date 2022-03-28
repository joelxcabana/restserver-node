const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos,validarArchivoSubir} = require('../middlewares')
const { cargarArchivo, actualizarImagen,mostrarImagen} = require('../controllers/uploads')
const { collectionPermitida } = require('../helpers')
const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo)

router.put('/:collection/:id',[
    validarArchivoSubir,
    check('id','el id tiene que ser de mogno').isMongoId(),
    check('collection').custom(c => collectionPermitida(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen)

router.get('/:collection/:id',[
    check('id','el id tiene que ser de mogno').isMongoId(),
    check('collection').custom(c => collectionPermitida(c,['usuarios','productos'])),
    validarCampos
],
mostrarImagen
)

module.exports = router;