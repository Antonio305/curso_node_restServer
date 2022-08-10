
//  libreria para el servidor 
const express = require('express');
router = express();



// libreriy for validation
const { check } = require('express-validator');
// rutas

// controlers 
const { cagetoriaPost, categoriaGet, categoriaGetId, categoriaPut, categoriaDelete } = require('../controllers/categoria');
const { validarJWT } = require('../middleware/validar_jwt');
const { validarCampos } = require('../middleware/validar_campos');
const { existeCaetgoria } = require('../helpers/existe_categoria');
const { tieneRole, esAdminRole } = require('../middleware/validar-roles');






// rutas post
// router.get('/', (req, res)=>
//    {
//      res.json({
//           msg : 'sjlsjfsfjlsfjlds'
//      });
//    }
// );

// middleware  para  la peticion con los id  
// existeCstegoria  middleara  personalizado

// publico
router.get('/', categoriaGet);

router.get('/:id', [
     check('id', 'No es un id valido, denbe ser de tipo mongo').isMongoId(),
     check('id').custom(existeCaetgoria),
     validarCampos
], categoriaGetId);

// post 
router.post('/',
     // middleware
     [
          validarJWT,
          check('name', 'El nombre es  obligatorio').not().isEmpty(),
          // check('status'),

          validarCampos


     ], cagetoriaPost);

router.put('/:id', [
     validarJWT,

     check('id', 'id no valido debe ser de tipo mongo').isMongoId(),
     check('id').custom(existeCaetgoria),
     check('name', 'el nombre es obligatorio').not().isEmpty(),
     
     // status y usuarios no se pasaon como parametro, usuario se asigna quien lo cambio en el controlador
     // check('status').not().isEmpty(),
     // check('usuario').not().isEmpty(),
     validarCampos
], categoriaPut);



router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'id debe ser de tipo mongo').isMongoId(),
    check('id').custom(existeCaetgoria),
    validarCampos
//     tieneRole('ADMIN_RULE', 'VENTAS_RULE, NO_RULE'),
], categoriaDelete);


// exportacion de las funciones 

module.exports = router;


