const { Categoria,Usuario,Producto} = require('../models');
const Rol = require('../models/rol')

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

const existeCategoria = async (id)=>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`Categoria ${id} no exist`)
    }
}

const existeProducto = async (id)=>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`Producto ${id} no exist`)
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUserById,
    existeCategoria,
    existeProducto
}