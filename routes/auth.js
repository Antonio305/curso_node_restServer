// const express = require('express');
// router = express();

// instancia del paquete express-validator y hacemo una destructuracion

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const { validarCampos } = require('../middleware/validar_campos');
const { validarJWT } = require('../middleware/validar_jwt');

const router = Router();

router.get('/login');

router.post('/login',

      // midleware 
      [
            // validarJWT,
            check('correo', 'Es correo no es valido, siiii').isEmail(), // validacion del  email
            check('password', 'El passwork es obligatorio').not().isEmpty(), // pasword no debe ser varias 
            validarCampos  // llamar la funcio para validar los campos 7 mostra los errores
      ], login);


module.exports = router;