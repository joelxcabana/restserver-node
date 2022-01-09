const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
   name:{
       type:String,
       required: [true,'Name is required']
   },
   status:{
    type:Boolean,
    default:true
   },
   user:{
       type:Schema.Types.ObjectId,
       ref:'Usuarios',
       required:true
   }
})

CategoriaSchema.methods.toJSON = function(){
    const { __v,status,...data} = this.toObject()
    return data
}

module.exports = model('Categoria',CategoriaSchema);