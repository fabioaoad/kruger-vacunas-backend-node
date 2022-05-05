const express = require('express')
const cors = require('cors')
const {dbConnection} = require("../database/config");



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:     '/api/auth',
            carpetas: '/api/carpetas',
            usuarios: '/api/usuarios',
            vacunasTipo: '/api/vacunasTipo',
            vacunas: '/api/vacunas',
            tareas: '/api/tareas'
        }


        // Conectar a BD
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y Parseo del Body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.carpetas, require('../routes/carpetas'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.vacunasTipo, require('../routes/vacunasTipo'));
        this.app.use(this.paths.vacunas, require('../routes/vacunas'));
        this.app.use(this.paths.tareas, require('../routes/tareas'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

}



module.exports = Server;
