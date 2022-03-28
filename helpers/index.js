const dbValidator = require('./db-validators')
const generarJwt = require('./generarjwt')
const googleVerify = require('./google-verify')
const subirArchivo = require('./subir-archivo')

module.exports = {
    ...dbValidator,
    ...generarJwt,
    ...googleVerify,
    ...subirArchivo
}