


// vamos a destructurar expresss para sacara algor de ahi
// sacamos la funcion routers
const { Router } = require('express');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,

} = require('../controllers/usuarios');

// instance fuction
const router = Router();  // llamamos la funcion

// no estamos ejecutando la funcion
// solo estmos haciendo referencia al misa
//con el parenteris hace que se ejecuta la funcion
router.get('/', usuariosGet);


// update 
// :id ea para definir que vamor a recivir un paramtro
router.put('/:id',usuariosPut);


// insertar data
router.post('/', usuariosPost);

// delete data          
router.delete('/',usuariosDelete);



// exportamoos el objeto de la instancia
module.exports = router;

// rutas definisdas por si sola en la cuales
// en la parte de arriba son creadas por aparte las funciones 
// en la cuales somo se hace la instancia en las respectivas functiones

//
// router.put('/', (req, res) => {
//     // se manda un jsonFX
//     res.json({
//         smg: 'put actualizacion de datos',
//         ok: 'yes'
//     });

// });