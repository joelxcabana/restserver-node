const jwt = require('jsonwebtoken')

const validarjwt = (req,res,next) =>{
    
    const token = req.header('token')

    if(!token){
        return res.status(401).json({
            msg:'no hay token'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETKEY)
        req.uid = uid
        
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