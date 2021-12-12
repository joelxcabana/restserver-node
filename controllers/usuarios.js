const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario')

const usuariosGet =async  (req = request, res = response) => {

   const { limite = 5, desde = 0 } = req.query
   const query = {
       estado:true
   }
   
   const [usuarios,total] = await Promise.all([
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
        Usuario.countDocuments(query)
   ])
    res.json({
      total,
      desde,
      limite,
      usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    //sacar todos menos google
    // const { google, ...resto } = req.body 
    const { name, email, password, rol } = req.body;
    const usuario = new Usuario({name,email,password,rol});

    //encriptar la contrasenia
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    //guardar en bd
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    const { _id,password,google, ...resto } = req.body

    //validar con base de datos
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}