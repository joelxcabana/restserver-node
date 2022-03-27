const {dbConnection} = require('../database/config')

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.path = {
            auth:'/api/auth',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar',
            uploads:'/api/uploads',
            usuarios:'/api/usuarios'
        }

        //conectar a base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
        // Directorio Público
        this.app.use( express.static('public') );
        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes() {
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.categorias, require('../routes/categorias'));
        this.app.use( this.path.productos, require('../routes/productos'));
        this.app.use( this.path.buscar, require('../routes/buscar'));
        this.app.use( this.path.uploads, require('../routes/uploads'));
        this.app.use( this.path.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
