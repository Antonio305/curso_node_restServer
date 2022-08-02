

const { response, request, json } = require('express');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
     // leemo el token 
     const token = req.header('x-token');
     console.log(token);
     if (!token) {
          // si no hay token sacamos de  la aplicacion
          return res.json({
               msg: "Por favor ingresa el   token"
          });
     }


     try {
          // funcion para a verificar el web token 
          // entremos el payload
          // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
          const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
          // creamos un  nuevo objeto en req
          req.uid = uid;
          // console.log(payload);




          // const usuario = await Usuario.findOne({ id: uid });
          const usuario = await Usuario.findById(uid);
          if (!usuario) {
               res.status(401).json({
                    msg: 'Usuario no existe en base de datos .... '
               });
          }



          if (!usuario.status) {
               return res.status(401).json({
                    msg: 'status con estado false'
               });
          }

          req.usuarios = usuario;


          next();

     } catch (error) {
          console.log(error);
          res.status(401).json({
               msg: 'TOken no valido'
          });
     }

     //     const errors = validationResult.   


     // cuando  recivimos varios parametro  los podmeos uni con .. // la cual se convierte en una lsita de datos 

   

}

module.exports = {
     validarJWT: validarJWT,
}
