const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const {generarJwt} = require('../helpers/generarjwt')


const login = async(req,res,next) =>{

    const {email,password} = req.body

     try {

        //vreificar si el email existe
        const usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario email/pass no son correctos'
            })
        }
        //verificar si el usuario esta activo
        if(!usuario.status){
            return res.status(400).json({
                msg:'Usuario email/pass no son correctos - estado false'
            })
        }

        //verificar el password
        const validpass = bcryptjs.compareSync(password,usuario.password)
        if(!validpass){
            return res.status(400).json({
                msg:'Usuario email/pass no son correctos - pass invalido'
            })
        }


        //generar el jwt
        const token = await generarJwt(usuario.id)

        res.json({
            usuario,
            token
        })
         
     } catch (error) {
         console.log(error)

         return res.status(500).json({
             msg:'algo salio mal'
         })
     }
    
}


module.exports = {
    login
}