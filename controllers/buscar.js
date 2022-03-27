
const ObjectId = require('mongoose').Types.ObjectId;
const { response } = require('express');
const {Usuario,Categoria,Producto} = require('../models')


const collectionsPermitidas = [
    'usuarios',
    'productos',
    'categoria',
    'roles'
]

const buscarUsuarios = async( termino = '', res = response )=>{
    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino,'i')
    
    const usuarios = await Usuario.find({
        $or:[{name:regex},{email:regex}],
        $and:[{status:true}]
    })
    res.json({
        results:usuarios
    })
}

const buscarCategorias = async( termino = '', res = response )=>{
    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino,'i')
    
    const categorias = await Categoria.find({name:regex,status:true})
    res.json({
        results:categorias
    })
}

const buscarProductos = async( termino = '', res = response )=>{
    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId){
        const producto = await Producto.findById(termino).populate('category','name')
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino,'i')
    
    const producto = await Producto.find({name:regex,status:true}).populate('category','name')
    res.json({
        results:producto
    })
}


const buscar = (req,res) =>{
    const {collection,termino } = req.params

    if(!collectionsPermitidas.includes(collection)){
       return res.status(400).json({
           msg:`las collections permitidas son ${collectionsPermitidas}`
       })
    }

    switch (collection){
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
        case 'categoria':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);
            break;
        default:
          res.status(500).json({
            msg:'se olvido hacer esta busqueda'
        })
    }

    //res.json({collection,termino})
}

module.exports = {
    buscar
}