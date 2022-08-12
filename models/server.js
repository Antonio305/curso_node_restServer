
const express = require('express');

const cors = require('cors');
const { dbConection } = require('../database/config');

const fileUpload = require('express-fileupload');

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
        // creamos una nueva ruta para la autentificacion 
        this.authPath = '/api/auth';
        // categoria
        this.categoriaPath = '/api/categorias';
        // oroductos
        this.productosPath = "/api/productos";
        // end portpar las busquedas 
        this.buscarPath = "/api/buscar";
        /// path para cargar archivos

        //  path  to opload files , camino apra cargar archivos 
        this.oploadPath = "/api/opload";



        // routes
        this.routes();

    }
    // fuction para la coneccion a la base de datas
    async conectarDB() {
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

        // fileOploa - cargar de archivos 
        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            // esto crear las carpeta si no existe de done se guardarlos archivos, la cual no marca error
            createParentPath : true
        }));
    }

    // se creaa dentro del metood ya solo se hace la sintacia dentro del metodo
    // creating  routes 
    routes() {

        // aca estamos creando el path
        // la ruta en la cula aca se inicia
        // solo se hace el llamdo de los otros metodos
        //comoparametro le pasamo el directorioa de las rutas

        // auth y usuarios es de donde estan los metodos com oget, pust entre otros.
        // ruta para la autentificacion 
        this.app.use(this.authPath, require('../routes/auth'));

        this.app.use('/api/usuarios', require('../routes/usuarios'));  // este  es un midleware

        // ruta para .los modelos 
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.productosPath, require('../routes/productos'));
        this.app.use(this.buscarPath, require('../routes/buscar'));
        this.app.use(this.oploadPath, require('../routes/opload'));

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