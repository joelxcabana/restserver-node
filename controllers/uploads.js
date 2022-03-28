const { v4: uuidv4 } = require('uuid');const {subirArchivo} = require('../helpers')


const cargarArchivo = async(req,res)=>{
  
    if (!req.files.archivo || !req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg:'no hay archivos que subir'});
      return;
    }

    try {
      const pathCompleto = await subirArchivo(req.files,undefined,'imgs')
      res.json({
        pathCompleto
      })
    } catch (msj) {
      res.status(400).json(msj)
    }
}


module.exports = {
    cargarArchivo
}