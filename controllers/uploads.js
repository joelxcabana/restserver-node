const path = require('path')
const { v4: uuidv4 } = require('uuid');

const cargarArchivo = (req,res)=>{
  
    if (!req.files.archivo || !req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg:'no hay archivos que subir'});
      return;
    }

    const {archivo} = req.files
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length -1]
    
    //validar extension
    const extensionesValidas = ['png','jpge','gif','jpg']

    if(!extensionesValidas.includes(extension)){
        res.status(400).json({msg:`la extension ${extension} no es valida, extensiones validasd ${extensionesValidas}`});
    }

    const nombreTemp = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname,'../uploads/',nombreTemp);
  
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