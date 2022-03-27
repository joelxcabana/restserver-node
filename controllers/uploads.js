const path = require('path')

const cargarArchivo = (req,res)=>{
  
    if (!req.files.archivo || !req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg:'no hay archivos que subir'});
      return;
    }

    const {archivo} = req.files;
  
    const uploadPath = path.join(__dirname,'../uploads/',archivo.name);
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      res.json({msg:`el archivo se subio a ${uploadPath}`});
    });
}


module.exports = {
    cargarArchivo
}