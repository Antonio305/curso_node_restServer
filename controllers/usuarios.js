

//hacemos una destructuracio  de express para ebtener el metodo esponse
const { response, request } = require('express');
// instace package bencypjs
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

// const { validationResult } = require('express-validator');
const { validarCampos } = require('../middleware/validar_campos');
const { post } = require('../routes/usuarios');
const { emailExist } = require('../helpers/db-validators');
const usuario = require('../models/usuario');
post
// solo vmaosa crear funcieos y esportarlas
const usuariosGet = async (req, res = response) => {
    // recivimos un json  o de otro tipo de datos
    //   const body = req.body; 
    // como recivirl oa query paramers , express de eso se hace cargo
    // const query = req.query; // sin desctructuracion

    // const { q, nombre = "No name", apiKey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;   // entraemos del url , regresa u String


    // esto genera un error que que ahce pa peticion depues de que 
    // termine el otro eto hace que se demore mucho
    // solucion una promesa, ejecuta los dos de forma simultanea

    const usuarios = await Usuario.find()
        .skip(Number(desde))  // indica de done iniciamoes 
        // .limit(3);  // recive un numero
        .limit(Number(limite));  // recive un numero
    // // paginacio de los datoas 
    // const total = await Usuario.countDocuments();
    // //   const total = await Usuario.countDocuments({ status: true });


    const query = { status: true } // indimcmoa uqel os datos que filtren deben ser de esta true

    // promesa 
    // const resp = await Promise.all([
    // destructuracion de arreglos 
    // const [total, usuarios] = await Promise.all([
    //     // Usuario.countDocuments(query),
    //     Usuario.count(query),
    //     Usuario.find()
    //         .skip(Number(desde))  // indica de done iniciamoes 
    //         // .limit(3);  // recive un numero
    //         .limit(Number(limite)) // recive un numero

    // ]);


    res.json({
        // total,
        usuarios
        // resp
    });

    // res.json({
    //     smg: 'get  api -controledor',
    //     ok: 'yes',
    //     // query
    //     q,
    //     // nombre,
    //     apiKey,
    //     page,
    //     limit
    // });

}

// fuction put
const usuariosPut = async (req, res = response) => {
    // la igual podemos hacer la desctructuracion


    // const id = req.params.id;
    const { id } = req.params;

    // hacemos la destructuracion de lod datos  de los ddtoa
    //  no hace falta password y el google
    //  lo demas lo guardamos  en el objeto resto
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: VALIDAR CONTRA BASE DE DATOS

    // SI VIENE EL PASSWORK ES QUE QUIERE ACTUALIZAR SU 
    if (password) {
        const salt = bcrypt.genSaltSync();      // grado de difucultad   
        resto.password = bcrypt.hashSync(password, salt);
    }
    // todos los datos lo almecenamos en el objeto usuario
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(
        usuario);

    // res.json(
    //     {
    //         // msg: 'put desde -controlador',
    //         // ok: 'yesss',
    //         // id,
    //         // resto
    //         usuario
    //     }
    // );
}

// function post
const usuariosPost = async (req, res = response) => {

    // voy es lo que recivimos el cliente.

    // const body = req.body;  // recvimos  todoel body
    // haremos la desctructuracion del body
    const { name, correo, password, rol } = req.body;
    //  hacemos la instancia del modelo, Y le pasmao el body
    // const usuario =  new Usuario(body);// este es solo la cracion del aintacnia no iestamos indicando que lo gruarde
    // const { nombre, edad } = req.body;    // destructuracino 



    // solo esto datos no interesa guardarlo
    const usuario = Usuario({ name, correo, password, rol }); // 

    // this.validarCampos();

    /* 
    1.- verificacion del correo
    2.- encriptar contraseña
    3.- guardar
    */


    // 1.- verificar is existe el correo
    // busca un bojeeto que tenga igual al correo que yo recivo como argumento
    // const existEmail = await Usuario.findOne({ correo: correo });
    // if (existEmail) {
    //     return res.status(400).json({
    //         msg: "El correo ya existe"
    //     });
    // }

    const salt = bcrypt.genSaltSync();  // indicmao el numero de veces, as complicados si el numero es mayor
    //  var hash  = bcrypt.hashSync(password, salt);
    // usuario.password = hash;
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();  // para guaradar los datoa, soloo que sev debe para todos los datos
    res.json({
        // msg: 'post -controlados',
        // ok: 'siiiii',
        usuario   //madamos el usuario  en vex de los datos
        // body,
        // nombre,
        // edad
    });
}



// fuction delete
const usuariosDelete = async(req, res) => {

    // const { id } = Usur.Usuario.
    // buscamo el 
  // estraemos el parametro _id 
   const {id} = req.params;
     //  eliinar los datos por completo 
    // const usuario = await Usuario.findByIdAndDelete(id); 

     // solo cambiamos de estado para mostrar los uqe estan en true
   const usuarioStatus =await Usuario.findByIdAndUpdate(id, {status: false});

        res.json({
            msg: 'delete desde controlador',
            // ok: 'yess'
            // usuario
            usuarioStatus
        });
}

// hacemosl ase exportaciones 
module.exports = {
    usuariosGet: usuariosGet,
    usuariosPost: usuariosPost,
    usuariosPut: usuariosPut,
    usuariosDelete: usuariosDelete,
}
