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


const existeUserById = async (id)=> {
    const existeUser = await Usuario.findById(id);
    if(!existeUser){
        throw new Error(`user ${id} not exits`)
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUserById
}