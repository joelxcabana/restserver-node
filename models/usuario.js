const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
   name:{
       type:String,
       required: [true,'Name is required']
   },
   email:{
    type:String,
    required: [true,'email is required'],
    unique:true
   },
   password:{
    type:String,
    required: [true,'password is required']
   },
   img:{
    type:String
   },
   rol:{
    type:String,
    required: [true,'rol is required'],
    //enum:['ADMIN_ROLE','USER_ROLE']
   },
   status:{
    type:Boolean,
    default:true
   },
   google:{
    type:Boolean,
    default:false
   },
})

UsuarioSchema.methods.toJSON = function(){
    const { __v,password,_id,...user} = this.toObject()
    user.uid = _id
    return user
}

module.exports = model('Usuarios',UsuarioSchema);