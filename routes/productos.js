

const { request, response } = require('express');
const express = require('express');

const { check } = require('express-validator');
const { createProducts, productosGet, getProductsById, putProductos, deleteProducts } = require('../controllers/productos');
const { existProductById } = require('../helpers/db-validators');
const { existeCaetgoria } = require('../helpers/existe_categoria');
const { esAdminRole, tieneRole } = require('../middleware/validar-roles');
const { validarCampos } = require('../middleware/validar_campos');
const { validarJWT } = require('../middleware/validar_jwt');

router = express();

// router.get

router.get('/',
     productosGet
);

router.get('/:id',
     [
          check('id', ' El id no es valido ').isMongoId(),
          check('id').custom(existProductById),
          validarCampos
     ],
     getProductsById
);


router.post('/',
     // validacion de los datos 
     [
          validarJWT,
          check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
          check('categoria', 'No es un ID de mongo').isMongoId(),
          check('categoria').custom(existeCaetgoria),
          validarCampos
     ],
     createProducts
);


// la categoria definimos quire actualizar o no
router.put('/:id', [
     validarJWT,
     esAdminRole,
     check('id', 'El id es obligatirio y de tipo mongo').isMongoId(),
     check('id').custom(existProductById),
     check('categoria', 'No es un ID de mongo').isMongoId(),
     check('name', 'El nombre es obligatorio').not().isEmpty(),


     validarCampos
],
     putProductos
);

router.delete('/:id',
     [
          validarJWT,
          esAdminRole,
          check('id', 'No es un id de mongo').isMongoId(),
          check('id').custom(existeCaetgoria),
     ],

     deleteProducts
);




module.exports = router;



