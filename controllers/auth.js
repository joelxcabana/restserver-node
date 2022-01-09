const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const {generarJwt} = require('../helpers/generarjwt')
const {googleVerify} = require('../helpers/google-verify')

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

const googleSignIn = async (req,res,next) =>{

    const {id_token} = req.body
   
    try {
    const {name,picture,email} = await googleVerify(id_token)
    console.log(`nashe ${name} - ${email} - ${picture}`)
   
    let usuario = await Usuario.findOne({email})
    if(!usuario){
        
        console.log("crear usuario")
        //tengo que crearlo
        const data = {
            name,
            email,
            password:':P',
            img:picture,
            rol:'ADMIN_ROL',
            google:true
        }

        usuario = new Usuario(data);
        await usuario.save();
    }
    console.log("entroo 2")
    //si el usuario en DB
    if(!usuario.status){
       res.status(401).json({
            msg:'hable con el administrador usuario bloqueado'
        })
    }

    //generar el jwt
    const token = await generarJwt(usuario.id)
    
    res.json({
        usuario,
        token
    })
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'el token no se pudo verificar'
        })
    }
}


module.exports = {
    login,
    googleSignIn
}