// const express = require('express');
// router = express();

// instancia del paquete express-validator y hacemo una destructuracion

const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarArchivos, mostrarImagen, actualizarArchivosCloundary } = require('../controllers/opload');
const { existeUsuarioById, coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivo } = require('../middleware/validar-archivo');

const { validarCampos } = require('../middleware/validar_campos');

const router = Router();


// rutas  ::: crear un nuevo subuir un nuevo archivo
router.post("/",
     validarArchivo,
     cargarArchivos);

// parametro ( coleccion, id de la coleccion que se desea acrualizar) 
router.put('/:coleccion/:id',
     // validacion el di debe ser de mongo
     [
          validarArchivo,
          check('id', 'El id debe ser de mongo ').isMongoId(),
          // le pasamos la coleccion que recivimos y las colecciones permitidos 
          check('coleccion').custom((c) => coleccionesPermitidas(c, ['usuarios', 'productos'])),
          // check('files', 'debe selecciones una  archivo').not().isEmpty(),

          validarCampos
     ],
     // actualizarArchivos
     actualizarArchivosCloundary  // actualizarImagensCloundary
);



// ruta para mostrar una  imagen 

router.get('/:coleccion/:id',
     [
          check('id', 'El id debe ser de mongo ').isMongoId(),
          check('coleccion').custom((c) => coleccionesPermitidas(c, ['usuarios', 'productos'])),
          validarCampos
     ],
     mostrarImagen
);








module.exports = router;