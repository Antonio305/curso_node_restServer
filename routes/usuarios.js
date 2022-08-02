


// vamos a destructurar expresss para sacara algor de ahi
// sacamos la funcion routers
// const { Router } = require('express');
const express = require('express');
router = express();

// instancia del paquete express-validator y hacemo una destructuracion
const { check } = require('express-validator');

// instan function validarCampos

const { validarCampos } = require('../middleware/validar_campos');
// validacion de los roles 
// const esRoleValido = require('../helpers/');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,

} = require('../controllers/usuarios');

// instance fuction
// const router = Router();  // llamamos la funcion

const Role = require('../models/role');
const { esRoleValido,
    emailExist,
    existeUsuarioById
} = require('../helpers/db-validators');
const { validarJWT
} = require('../middleware/validar_jwt');
const { esAdminRole, tieneRole } = require('../middleware/validar-roles');
// no estamos ejecutando la funcion
// solo estmos haciendo referencia al misa


//con el parenteris hace que se ejecuta la funcion
router.get('/', usuariosGet);


// update 
// :id ea para definir que vamor a recivir un paramtro

/* validaciones el put 
 1.- debe ser un id  valldo tipo mondo
   hay un metodo especial para express-validator para ver si el id es de tipo isMondoId
   
*/

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom((id) => existeUsuarioById(id)),
    check('rol').custom(esRoleValido),
    validarCampos,   // si para todo valida os campos
], usuariosPut);


// insertar data
// agremos el midleware,  is con las de dos de para como parametro un arreglo
router.post('/', [
    // check podemeos definir los campos que devemos revisar
    // aca va guardando los error 
    check('name', "El nombre es obligatorio").not().isEmpty(),
    check('correo', "El correo no es valido , por favor ingresa uno que sea valido").isEmail(),
    check('correo').custom(emailExist),

    // / validacion personalizada del correo
    // check('correo').custom( emailExiste).isEmail(),


    check('password', "la contraseña es obligatoria y  mayor a 10 letras").isLength({ min: 6 }),
    // EL ROL DEBE SER UNA DE LAS DEFINILAS LO CONTRARIO MARCA UN ERROR
    // check('rol', "No es rol  valido").isIn([ 'ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom(
    //     async (rol = '') => {
    //         const existRol = await Role.findOne({ rol: rol });
    //         if (!existRol) {
    //             throw new Error(`El rol ${rol}, no estaaregistrado en la base de datos`);
    //         }
    //     }
    // ),
    check('rol').custom(esRoleValido),

    validarCampos,   // si pasas todas las validaciones ejecuta el controlados
],

    usuariosPost);

// delete data          
router.delete('/:id',
    // validadcio npara el id ;preguntmos si es de tipo mongo, y sis existe el id 
    [
        validarJWT,
        esAdminRole,  // fuera que debe ser administrador 
        tieneRole('ADMIN_RULE', 'VENTAS_RULE, NO_RULE'),
        check('id', 'El id no es valido').isMongoId(),
        // check('id').custom((id) => existeUsuarioById(id)),
        check('id').custom((id) => existeUsuarioById(id)),
        validarCampos
    ], usuariosDelete);



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