const validarjwt = require('../middlewares/validad-jwt')
const validaRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validation')
const validarArchivoSubir = require('../middlewares/validar-archivo')
module.exports = {
    ...validarCampos,
    ...validarjwt,
    ...validaRoles,
    ...validarArchivoSubir
}