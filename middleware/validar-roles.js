

const { validationResult } = require('express-validator');
const { request, response } = require('express');

const esAdminRole = async (req = request, res = response, next) => {

     // el usuario lo vamos a obtener desde el request que 
     // estamos  asignamos en el validartjwt 

     // preguntamos si viene el usuario

     if (!req.usuarios) {
          // 501  error  del servidor 
          return res.status(501).json({
               mgs: 'se requiere verificar el role sin validar el token primero'
          });
     }

     const { rol, name } = req.usuarios;

     if (rol !== 'ADMIN_RULE') {
          // 402 de no actuarizado
          return res.status(401).json({
               mgs: `${name} no es  administrador`
          });
     }

     next();
}


const tieneRole = (...roles) => {
     // returna un callbak  una funcion dentro de otra funcion 



     return (req, res = response, next) => {

          if (!req.usuarios) {
               // 501  error  del servidor 
               return res.status(501).json({
                    mgs: 'se requiere verificar el role sin validar el token primero'
               });

               //     console.log(roles , req.usuarios);
               const { rol } = req.usuarios.rol;


               // si nos esta incluidos .os errre tiramos el error

               if (roles.includes(req.usuarios.rol)) {
                    // return error
                    return res.status(401).json({
                         mgs: `es servicio require uno de esto roles ${roles}`
                    });
               }


               // if (roles[0] === rol) {
               //      return res.status(401).json({
               //           mgs: 'soy administrador'
               //      });
               // }

               // if (roles[1] === rol) {
               //      return res.status(401).json({
               //           mgs: 'Ventas Role'
               //      });
               // }

               // if (roles[2] === rol) {
               //      return res.status(401).json({
               //           mgs: 'No Rule'
               //      });
               // }

               next();
          }
     }
}


module.exports = {
     esAdminRole: esAdminRole,
     tieneRole: tieneRole
}