

//  libreria para el servidor 
const express = require('express');
const { buscar } = require('../controllers/buscar');
router = express();


// routes get , para las busquedas

// recie como parametro ( la coleccion y el temino a buscar) 
router.get('/:coleccion/:termino', buscar);


 module.exports = router;


