const esAdminRole = (req,res,next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:'se quiere verificar el rol sin validar el token primero'
        })
    }

    const { rol, name} = req.usuario

    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg:`${name} no es admin`
        })
    }

    next()
}

const tieneRole = (...roles) =>{
return (req,res,next) =>{
    if(!req.usuario){
        return res.status(500).json({
            msg:'se quiere verificar el rol sin validar el token primero'
        })
    }

    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            msg:`El servicio require uno de estos roles ${roles}`
        })
    }
    
    next()
  }
}

module.exports = {
    esAdminRole,
    tieneRole
}