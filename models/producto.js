const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
   name:{
       type:String,
       required: [true,'Name is required']
   },
   status:{
    type:Boolean,
    default:true,
    required:true
   },
   user:{
       type:Schema.Types.ObjectId,
       ref:'Usuarios',
       required:true
   },
   price:{
       type:Number,
       default: 0
   },
   category:{
       type:Schema.Types.ObjectId,
       ref:'Categoria',
       required:true
   },
   description:{
       type:String
   },
   available:{
       type:Boolean,
       default:true
   }
})

ProductoSchema.methods.toJSON = function(){
    const { __v,status,...data} = this.toObject()
    return data
}

module.exports = model('Producto',ProductoSchema);