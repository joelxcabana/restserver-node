const path = require('path');
const { v4: uuidv4 } = require('uuid');const {subirArchivo} = require('../helpers')
const {Usuario,Producto} = require('../models')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

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


const actualizarImagen = async (req,res) =>{

  const { id, collection } = req.params

  let modelo;
  switch (collection) {
    case 'usuarios':
          modelo = await Usuario.findById(id)
          if(!modelo){
            return res.status(400).json({msg:'no existe un usuario con el id '+ id})
          }
      break;
    case 'productos':
          modelo = await Producto.findById(id)
          if(!modelo){
            return res.status(400).json({msg:'no existe un producto con el id '+ id})
          }
      break;
    default:
      return res.status(500).json({msg:'se me olvido controlar esto'})
  }

  //limpiar imagenes previas
  if(modelo.img){
     // hay que borrar la img del server
     const pathImagen = path.join(__dirname,'../uploads',collection,modelo.img)
     if(fs.existsSync(pathImagen)){
       fs.unlinkSync(pathImagen)
      }
  }

  const nombre = await subirArchivo(req.files,undefined,collection)
  modelo.img = nombre
  await modelo.save()

  res.json({ modelo })
}




const mostrarImagen = async (req,res) => {
  const { id, collection } = req.params

  let modelo;
  switch (collection) {
    case 'usuarios':
          modelo = await Usuario.findById(id)
          if(!modelo){
            return res.status(400).json({msg:'no existe un usuario con el id '+ id})
          }
      break;
    case 'productos':
          modelo = await Producto.findById(id)
          if(!modelo){
            return res.status(400).json({msg:'no existe un producto con el id '+ id})
          }
      break;
    default:
      return res.status(500).json({msg:'se me olvido controlar esto'})
  }

  //limpiar imagenes previas
  if(modelo.img){
     // hay que borrar la img del server
     const pathImagen = path.join(__dirname,'../uploads',collection,modelo.img)
     if(fs.existsSync(pathImagen)){
         return res.sendFile(pathImagen)
      }
  }

  const pathImagen = path.join(__dirname,'../assets/noimg.png')
  return res.sendFile(pathImagen)
}

const actualizarImagenCloudinary = async (req,res) =>{

  const { id, collection } = req.params

  let modelo;
  switch (collection) {
    case 'usuarios':
          modelo = await Usuario.findById(id)
          if(!modelo){
            return res.status(400).json({msg:'no existe un usuario con el id '+ id})
          }
      break;
    case 'productos':
          modelo = await Producto.findById(id)
          if(!modelo){
            return res.status(400).json({msg:'no existe un producto con el id '+ id})
          }
      break;
    default:
      return res.status(500).json({msg:'se me olvido controlar esto'})
  }

  //limpiar imagenes previas
  if(modelo.img){
    const nombreArr = modelo.img.split('/')
    const nombre = nombreArr[nombreArr.length - 1]
    const [public_id] = nombre.split('.')
    
    cloudinary.uploader.destroy(public_id)
  }
     
  //subir a cloudinary
  const { tempFilePath } = req.files.archivo
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

  modelo.img = secure_url
  await modelo.save()

  res.json({ modelo })
}
module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}