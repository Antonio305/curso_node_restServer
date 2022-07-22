



//en las base de datos relacionales se crear tablas y hacer las conecciones 
// en mongo son no relacioens 
// la cula en cada campo se crea como un objeto

// hacemos una destructuracion de mongoose

const { Schema, model } = require('mongoose');
const usuarios = require('../controllers/usuarios');
// creamos loa campos
const UsuarioChema = Schema({

    name: {
        type: String,
        // podmeos para solo true o pasa una arrgo 
        required: [true, 'the name is mandatory']
    },
    correo: {
        type: String,
        required: [true, 'mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password required'],
        unique: true
    },
    image: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['AMIN_ROLE', 'USER_ROLE'],
    },
    status: {
        type: Boolean,
        default: true
    },
    // pregunta si es creado por google
    google: {
        type: Boolean,
        default: true
    }
});


// podmeos sobreescribir metodos como las cuales  las haremos a contunuacion 
// toJson es la que se llama cuando se hace una impresuion de json o un String 

// es una funcion normal porr u e se usara el objeto this
UsuarioChema.methods.toJSON = function () {
    // con la destructuracion definimos uqe no quereos mostrar
    // todo lo demas lo guaurdamos el el parametro usuario 
    // cuando se manda a llamar el toJson ejecuta esta funcion 
    // toObject guarda todos los argumenntos que se pasa
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

// con esto queda creado nuestor modelo 
module.exports = model('Usuario', UsuarioChema);


// HaFkzNFRamNGK4Jy