const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPost = async (req, res = response) => {

    //sacar todos menos google
    // const { google, ...resto } = req.body 
    const { name, email, password, rol } = req.body;
    const usuario = new Usuario({name,email,password,rol});

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        return res.status(400).json({
            message:'Email already exists'
        })
    }

    
    //encriptar la contrasenia
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    //guardar en bd
    await usuario.save();

    res.json({
        msg: 'user added suceffull'
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
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