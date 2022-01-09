const req = require('express/lib/request')
const {Categoria} = require('../models')


const crearCategoria = async (req,res) =>{

    const name = req.body.name.toUpperCase()
    console.log("entro")
    const categoriaDB = await Categoria.findOne({name})
    console.log("entro 2")
    if(categoriaDB){
        return res.status(400).json({
            msg: `la categoria ${name} ya existe`
        })
    }

    //generar la data a guardar
    const data = {
        name,
        user:req.usuario._id
    }

    const categoria = await new Categoria(data)
    await categoria.save()
    
    res.status(201).json(categoria)
}

//paginado - total - populate
const obtenerCategorias = async(req,res) =>{
   
    const { limite = 5, desde = 0 } = req.query
    const query = {
     status:true
    }
    
    const [categorias,total] = await Promise.all([
         Categoria.find(query)
            .populate('user','name')
            .skip(Number(desde))
            .limit(Number(limite)),
         Categoria.countDocuments(query)
    ])
     res.json({
       total,
       desde,
       limite,
       categorias
     });
}

//populate
const obtenerCategoria = async(req,res) =>{
    
    const {id} = req.params
    const categoria = await Categoria.findById(id).populate('user','name')
    res.json(categoria)
}


const actualizarCategoria = async (req,res)=>{
   
    const {id} = req.params
    const {status,...data} = req.body

    data.name = data.name.toUpperCase()
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true})

    res.json(categoria)
}


const borrarCategoria = async (req,res) =>{
      
    const {id} = req.params

    const categoriaBoorada = await Categoria.findByIdAndUpdate(id,{status:false},{new:true})
    res.json(categoriaBoorada)
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
    
}