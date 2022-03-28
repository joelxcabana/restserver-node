const { v4: uuidv4 } = require('uuid');
const path = require('path')

const subirArchivo = (files,extensionesValidas = ['png','jpge','gif','jpg','pdf'],carpeta = 'textos') => {

    return new Promise ((resolve,reject) => {
        const {archivo} = files
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length -1]
    
        if(!extensionesValidas.includes(extension)){
            return reject({msg:`la extension ${extension} no es valida, extensiones validasd ${extensionesValidas}`})
        }
    
        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject(err)
          }
      
          resolve(nombreTemp);
        });
    })
}

module.exports = {
    subirArchivo
}