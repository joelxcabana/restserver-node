const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarjwt = async(req,res,next) =>{
    
    const token = req.header('token')

    if(!token){
        return res.status(401).json({
            msg:'no hay token'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETKEY)
        req.uid = uid

        //crear usuario
        req.usuario = await Usuario.findById(uid)

        if(!req.usuario){
            return res.status(401).json({
                msg:'token no valid usuario no existe 2'
            })
        }

        //verificar si no esta eliminadoi
        if(!req.usuario.status){
            return res.status(401).json({
                msg:'token no valid usuario no existe'
            })
        }        
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:'no valido token ttttt'
        })
    }

 
}

module.exports = {
    validarjwt
}