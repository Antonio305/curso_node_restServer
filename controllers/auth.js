// destructuracion del  express
// del controlador no son ms que funciones 

const { response, request } = require('express');
/// swe hace la instancia al modelo
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar_jwt');
const { googleVerify } = require('../helpers/google_verify');



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

const googleSingIn = async (req = request, res = response) => {
     // obtenemos el id_token 
     const { id_token } = req.body;

     try {
          // const googleUser = await googleVerify(id_token);   // es una promesa
          // console.log(googleUser);

          const { name, image, correo } = await googleVerify(id_token);   // es una promesa

          //  1.- preguntamos si el correo  ya existe en la base de datos 
          let usuario = await Usuario.findOne({  correo });


          if (!usuario) {
               // si no existe hay que crearlo
               // para grabar los datos se manda  un objeto 

               const data = {
                    name,
                    correo,
                    password: ':p',
                    image,
                    google: true,
                    rol: 'ADMIN_RULE'
               };

               usuario = new Usuario(data);
               await usuario.save();
               // console.log('Usuari guarddo : ' , usuario);
          }


          //  validacion por el status de la aplicacion 
          // isesta el false no  le daremos pase 
          if (!usuario.status) {
               return res.status(401).json({
                    msg: 'Hable con el aministrador, usuario bloqueado'
               });
          }


          //  generar el jwt 
          const token = await generarJWT(usuario.id);

          res.json({
               msg: 'TODO BIEN, google sing In',
               usuario,
               token
          });


     } catch (error) {

          res.status(400).json({
               og: 'false',
               msg: 'El token no se puede verificar'
          });

     }


}


module.exports = {
     login: login,
     googleSingIn: googleSingIn
}


