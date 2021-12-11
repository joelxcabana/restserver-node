const Rol = require('../models/rol')
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '')=> {
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
        throw new Error(`Rol ${rol} is not valid`)
    }
}


const emailExiste = async (email = '')=> {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`Email ${email} exits`)
    }
}

module.exports = {
    esRolValido,
    emailExiste
}