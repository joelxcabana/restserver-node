const mongoose = require('mongoose')

const dbConnection = async() => {
   try {
       await mongoose.connect( process.env.URL_MONGODB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
       })

       console.log("base de datos online")
   } catch (error) {
       console.log(error)
       throw new Error('error a la hora de iniciar la base de datos')
   }
}


module.exports = {
    dbConnection
}