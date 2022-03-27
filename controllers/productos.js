const req = require('express/lib/request')
const {Producto} = require('../models')


const crearProducto = async (req,res) =>{

    const {status,user,...body} = req.body
    const productoDB = await Producto.findOne({name:body.name})
    if(productoDB){
        return res.status(400).json({
            msg: `el producto ${name} ya existe`
        })
    }

    //generar la data a guardar
    const data = {
        ...body,
        name : body.name.toUpperCase(),
        user:req.usuario._id
    }

    const producto = await new Producto(data)
    await producto.save()
    
    res.status(201).json(producto)
}

//paginado - total - populate
const obtenerProductos = async(req,res) =>{
   
    const { limite = 5, desde = 0 } = req.query
    const query = {
     status:true
    }
    
    const [productos,total] = await Promise.all([
         Producto.find(query)
            .populate('user','name')
            .populate('category','name')
            .skip(Number(desde))
            .limit(Number(limite)),
            Producto.countDocuments(query)
    ])
     res.json({
       total,
       desde,
       limite,
       productos
     });
}

//populate
const obtenerProducto = async(req,res) =>{
    const {id} = req.params
    const producto = await Producto.findById(id).populate('user','name').populate('category','name')
    res.json(producto)
}


const actualizarProducto = async (req,res)=>{
   
    const {id} = req.params
    const {status,user,...data} = req.body

    if(data.name){
        data.name = data.name.toUpperCase()
    }
   
    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true})

    res.json(producto)
}


const borrarProducto = async (req,res) =>{
      
    const {id} = req.params

    const productoBoorada = await Producto.findByIdAndUpdate(id,{status:false},{new:true})
    res.json(productoBoorada)
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}