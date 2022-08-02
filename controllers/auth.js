// destructuracion del  express
// del controlador no son ms que funciones 

const { response } = require('express');
/// swe hace la instancia al modelo
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar_jwt');

const login = async (req, res = response) => {
     // we extract  the email is the password
     const { correo, password } = req.body;

     /* 
         pasos: 
         1.- check if they email exits ,verificar si el correo existe 
         2.- if the user is active
         3.-  verify password
         4.- generar el jwt
      */

     try {
          const usuario = await Usuario.findOne({ correo }); // fintOne solo busca uno

          // validate email 
          if (!usuario) {

               return res.status(400).json({
                    msg: 'usuario password no son correctos - correo'
               });
          }

          // validate status 
          // usuario.status == false
          if (!usuario.status) {
               return res.json({
                    msg: 'usuario password no son correctos - correo, stus: false'
               });
          }

          // validacion del usuario, true, false
          // compara el password recivido con el passwork del usuaio
          const validatePassword = bcrypt.compareSync(password, usuario.password);

          if (!validatePassword) {
               return res.json({
                    msg: 'usuario password no son correctos - correo, stus: false, contraseña incorrecta'
               });
          }

          // generar JWT 
          // no tiene promesa
          const token = await generarJWT(usuario.id);

          res.json({

               msg: 'Bienvenido chavlaes',
               usuario,
               token

          });


     } catch (error) {
          console.log(error);
          return res.status(500).json({
               // ha salido un error
               msg: 'an error has come out'
          });
     }

}


module.exports = {
     login: login
}


