
const express = require('express');

const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {


    constructor() {
        // this.port = 3000;  // puerto
        this.port = process.env.PORT;

        this.app = express(); // server
        // conectar a base de datos
        // lo llamos justo cuando se esta creando nuestro servidor
        this.conectarDB();

        // midleware
        this.midleware();

        // usuariosPath = '/api/usuarios';  
        this.endPoit = 'api/usuarios';

        // routes
        this.routes();

    }
    // fuction para la coneccion a la base de datas
    async conectarDB()  {
        // llamamos la function desde aca
        await dbConection();
    }

    // function midleware 
    midleware() {
        // podemos definier en el midleware que los tipos de datos que vamos a recivir


        this.app.use(cors());
        // otro moddleware, lectura y parseo del body
        this.app.use(express.json());

        // direccion publico, para acceder als carpeta publica
        this.app.use(express.static('public'));

    }


    // cerating routes 
    routes() {

        // aca estamos creando el path
        // la ruta en la cula aca se inicia
        // solo se hace el llamdo de los otros metodos
        //comoparametro le pasamo el directorioa de las rutas

        this.app.use('/api/usuarios', require('../routes/usuarios'));  // este  es un midleware


        // ruta inicial ya no sera llamado  por que esta definido en el index
        // this.app.get('/', (req, res) => {
        //     res.json('Hola moar');
        // });
    }


    // creamos otro metodo para el listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
}
module.exports = Server;